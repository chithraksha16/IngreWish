import { GoogleGenAI } from "@google/genai";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINIAI_API_KEY || '' });

interface AIrecipe {
  input: string;
  taste?: string;
  title: string;
  instruction: string[];
  calories: number;
  protein: number;
  missingItems?: string[];
}

export const generateFromAi = async (input: string, taste: string): Promise<AIrecipe> => {
  const prompt = `
You are a professional chef AI. Generate a recipe based on the following ingredients and taste preference.

Ingredients: ${input}
Taste Preference: ${taste}

Return a JSON object in this format:
{
  "title": "string",
  "instruction": ["Step 1", "Step 2", ...],
  "calories": number,
  "protein": number,
  "missingItems": ["item1", "item2",...]
}
`;

const completion = await genai.models.generateContent({
    model: "gemini-pro",
    contents: [
    {
        role: "user",
        parts: [{ text: prompt }],
    },
    ],
});

const response = completion?.candidates?.[0]?.content?.parts?.[0]?.text || "";

try {
    const match = response.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonText = match ? match[1].trim() : response;
    const parsed = JSON.parse(jsonText);

    // Return final recipe with original input and taste
    return {
    input,
    taste,
    ...parsed,
    };
} catch (e) {
    console.error("Failed AI response:", response);
    throw new Error("Failed to parse AI response");
}
};
