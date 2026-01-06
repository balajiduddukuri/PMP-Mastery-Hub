
import { GoogleGenAI, Type } from "@google/genai";
import { AIInsight, Question, ExamDifficulty, ProjectLifecycle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTaskInsights = async (
  taskName: string, 
  domainName: string, 
  enablerDescription: string,
  lifecycle: ProjectLifecycle = 'hybrid'
): Promise<AIInsight> => {
  const prompt = `As a PMP Exam Author, provide deep insights for: "${enablerDescription}"
Context: Task "${taskName}" (${domainName} domain) using a ${lifecycle.toUpperCase()} lifecycle.

Required:
1. Practical strategy & modern perspective.
2. Catchy MNEMONIC.
3. Traditional ITTOs (Inputs, Tools/Techniques, Outputs) relevant to this action.
4. "Interconnectivity": How this connects to other domains (e.g. how this People task impacts Process).`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          bestPractices: { type: Type.ARRAY, items: { type: Type.STRING } },
          commonPitfalls: { type: Type.ARRAY, items: { type: Type.STRING } },
          modernPerspective: { type: Type.STRING },
          tipsToRemember: { type: Type.ARRAY, items: { type: Type.STRING } },
          mnemonic: { type: Type.STRING },
          ittos: {
            type: Type.OBJECT,
            properties: {
              inputs: { type: Type.ARRAY, items: { type: Type.STRING } },
              tools: { type: Type.ARRAY, items: { type: Type.STRING } },
              outputs: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          interconnectivity: { type: Type.STRING }
        },
        required: ["summary", "bestPractices", "commonPitfalls", "modernPerspective", "tipsToRemember", "mnemonic", "ittos", "interconnectivity"]
      }
    }
  });

  return { ...JSON.parse(response.text.trim()), debugPrompt: prompt };
};

export const getSynthesizedTaskInsights = async (
  taskName: string, 
  domainName: string, 
  enablers: string[],
  lifecycle: ProjectLifecycle = 'hybrid'
): Promise<AIInsight> => {
  const prompt = `As a PMP Exam Author, provide a SYNTHESIZED strategic overview for the entire task: "${taskName}" (${domainName} domain).
Lifecycle: ${lifecycle.toUpperCase()}.
Included Enablers: ${enablers.join(', ')}.

Focus on the connectivity between these enablers. Provide a master strategy that covers all of them, a unified mnemonic, and overall ITTOs for the task.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          bestPractices: { type: Type.ARRAY, items: { type: Type.STRING } },
          commonPitfalls: { type: Type.ARRAY, items: { type: Type.STRING } },
          modernPerspective: { type: Type.STRING },
          tipsToRemember: { type: Type.ARRAY, items: { type: Type.STRING } },
          mnemonic: { type: Type.STRING },
          ittos: {
            type: Type.OBJECT,
            properties: {
              inputs: { type: Type.ARRAY, items: { type: Type.STRING } },
              tools: { type: Type.ARRAY, items: { type: Type.STRING } },
              outputs: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          interconnectivity: { type: Type.STRING }
        },
        required: ["summary", "bestPractices", "commonPitfalls", "modernPerspective", "tipsToRemember", "mnemonic", "ittos", "interconnectivity"]
      }
    }
  });

  return { ...JSON.parse(response.text.trim()), debugPrompt: prompt };
};

export const generateExamQuestions = async (domains: string[], difficulty: ExamDifficulty): Promise<Question[]> => {
  const count = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 8;
  const prompt = `Generate ${count} PMP situational questions. 
  Difficulty: ${difficulty.toUpperCase()}.
  Focus on "What's Next?" situational logic. The Project Manager must analyze a crisis and pick the BEST next step.
  Include taskId if possible. Output JSON array.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswerIndex: { type: Type.NUMBER },
            explanation: { type: Type.STRING },
            domain: { type: Type.STRING },
            taskId: { type: Type.STRING }
          },
          required: ["id", "question", "options", "correctAnswerIndex", "explanation", "domain"]
        }
      }
    }
  });

  return JSON.parse(response.text.trim());
};

export const getGlobalExamNotes = async (): Promise<{notes: string[], mindset: string}> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Provide 7 Key PMP Exam Notes and a Master Mindset statement. JSON format.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          notes: { type: Type.ARRAY, items: { type: Type.STRING } },
          mindset: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text.trim());
};
