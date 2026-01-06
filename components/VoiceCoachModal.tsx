
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

interface VoiceCoachModalProps {
  context: string;
  onClose: () => void;
}

// Manual base64 encoding/decoding functions as per @google/genai guidelines
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Correct audio decoding for raw PCM data from Gemini Live API
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const VoiceCoachModal: React.FC<VoiceCoachModalProps> = ({ context, onClose }) => {
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState('Initializing...');
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const startSession = async () => {
    try {
      setStatus('Connecting to Gemini Live...');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Separate contexts for input (16kHz) and output (24kHz) to optimize for Live API expectations
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: `You are a difficult stakeholder in a PMP Exam scenario related to: ${context}. 
          The user must practice Servant Leadership and Conflict Resolution. Challenge them, then provide feedback on their PM mindset.`,
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } }
        },
        callbacks: {
          onopen: () => {
            setActive(true);
            setStatus('Coaching Active - Start Speaking');
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const processor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };

              // CRITICAL: Solely rely on sessionPromise resolves to ensure data is sent after connection
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(processor);
            processor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            
            if (base64EncodedAudioString && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              // Tracking cursor for gapless playback
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(
                decode(base64EncodedAudioString),
                ctx,
                24000,
                1,
              );
              
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            // Handle model interruption: stop all currently playing audio
            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current.values()) {
                try { source.stop(); } catch (e) {}
              }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => onClose(),
          onerror: (e) => { 
            console.error('Gemini Live Error:', e); 
            setStatus('Connection Error'); 
          }
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Session Start Failed:', err);
      setStatus('Failed to start microphone or session.');
    }
  };

  useEffect(() => {
    startSession();
    return () => {
      inputAudioContextRef.current?.close();
      outputAudioContextRef.current?.close();
      sessionRef.current?.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 backdrop-blur-xl p-6">
      <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 text-center shadow-2xl overflow-hidden relative">
        <div className={`absolute top-0 left-0 w-full h-2 bg-indigo-500 transition-all ${active ? 'animate-pulse' : 'opacity-20'}`}></div>
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className={`w-10 h-10 ${active ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Voice Coach</h2>
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-8">{status}</p>
        
        <div className="bg-slate-50 p-6 rounded-3xl mb-8 text-left border border-slate-100">
           <span className="text-[10px] font-black text-indigo-400 uppercase block mb-2">Scenario Context</span>
           <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{context}"</p>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-rose-600 transition-all shadow-xl"
        >
          END COACHING SESSION
        </button>
      </div>
    </div>
  );
};

export default VoiceCoachModal;
