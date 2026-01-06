
import { GoogleGenAI, Type } from "@google/genai";
import { AIInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTaskInsights = async (taskName: string, domainName: string, enablerDescription: string): Promise<AIInsight> => {
  const prompt = `As an expert Senior Project Manager with 20+ years of experience, provide deep insights for this specific PMP enabler (sub-task):
"${enablerDescription}"

Context:
- Task: ${taskName}
- Domain: ${domainName}

Focus ONLY on this specific action. Provide a practical strategy, common pitfalls for this specific activity, and a catchy mnemonic or tip to remember this detail for the exam.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "A high-level expert overview of this specific sub-task's importance." },
          bestPractices: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "3-5 high-impact best practices specifically for this sub-task." 
          },
          commonPitfalls: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Common mistakes project managers make regarding this specific sub-task." 
          },
          modernPerspective: { 
            type: Type.STRING, 
            description: "How AI or modern remote/hybrid work is changing this specific activity." 
          },
          tipsToRemember: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Catchy tips or mnemonics to help remember this specific concept for the exam."
          }
        },
        required: ["summary", "bestPractices", "commonPitfalls", "modernPerspective", "tipsToRemember"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text.trim());
    return { ...data, debugPrompt: prompt };
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Insight generation failed.");
  }
};

export const getSynthesizedTaskInsights = async (taskName: string, domainName: string, selectedEnablers: string[]): Promise<AIInsight> => {
  const enablerContext = selectedEnablers.map(e => `- ${e}`).join('\n');
  const prompt = `As an expert Senior Project Manager, provide a synthesized study strategy for these SELECTED sub-tasks within the task "${taskName}" (${domainName} domain):

${enablerContext}

Focus on how these specific items connect to each other in a real-world project and for the PMP exam. Provide a high-level mastery strategy.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "A synthesized overview of how these selected sub-tasks work together." },
          bestPractices: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Best practices that bridge these selected sub-tasks." 
          },
          commonPitfalls: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Strategic mistakes when handling these items in combination." 
          },
          modernPerspective: { 
            type: Type.STRING, 
            description: "Modern context for this group of activities." 
          },
          tipsToRemember: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Synthesized mnemonics for this group."
          }
        },
        required: ["summary", "bestPractices", "commonPitfalls", "modernPerspective", "tipsToRemember"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text.trim());
    return { ...data, debugPrompt: prompt };
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Synthesis generation failed.");
  }
};
