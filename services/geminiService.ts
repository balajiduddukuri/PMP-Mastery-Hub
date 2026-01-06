
import { GoogleGenAI, Type } from "@google/genai";
import { AIInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTaskInsights = async (taskName: string, domainName: string): Promise<AIInsight> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `As an expert Senior Project Manager with 20+ years of experience, provide deep insights for the PMP task: "${taskName}" within the "${domainName}" domain. 
    Focus on practical reality vs theoretical framework. Provide a few catchy tips or mnemonics to remember this for the exam.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "A high-level expert overview of the task's importance." },
          bestPractices: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "3-5 high-impact best practices for this task." 
          },
          commonPitfalls: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Common mistakes project managers make with this task." 
          },
          modernPerspective: { 
            type: Type.STRING, 
            description: "How AI or modern remote/hybrid work is changing this task." 
          },
          tipsToRemember: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Catchy tips or mnemonics to help remember this concept for the exam."
          }
        },
        required: ["summary", "bestPractices", "commonPitfalls", "modernPerspective", "tipsToRemember"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Insight generation failed.");
  }
};
