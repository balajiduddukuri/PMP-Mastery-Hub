
import React, { useState, useEffect } from 'react';
import { generateThematicImage } from '../services/geminiService';

interface AIThematicImageProps {
  prompt: string;
  className?: string;
  id: string; // Used for caching
}

const AIThematicImage: React.FC<AIThematicImageProps> = ({ prompt, className = "", id }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem(`pmp_img_${id}`);
    if (cached) {
      setImgUrl(cached);
    } else {
      handleGenerate();
    }
  }, [id]);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateThematicImage(prompt);
    if (result) {
      setImgUrl(result);
      try {
        localStorage.setItem(`pmp_img_${id}`, result);
      } catch (e) {
        // Handle quota exceeded for localStorage if images are too many
        console.warn("Storage quota exceeded for images");
      }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className={`bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center overflow-hidden ${className}`}>
        <div className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Synthesizing Visual...</div>
      </div>
    );
  }

  if (!imgUrl) {
    return (
      <div className={`bg-slate-200 rounded-2xl flex items-center justify-center ${className}`}>
        <button onClick={handleGenerate} className="text-[8px] font-black text-slate-400 uppercase hover:text-indigo-600 transition-colors">Regenerate Visual</button>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <img 
        src={imgUrl} 
        alt={prompt} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default AIThematicImage;
