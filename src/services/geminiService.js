import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateTripJSON(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // or "gemini-1.5-pro" for more accuracy
    });

    // Tell Gemini to return structured JSON
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json", // 👈 ensures JSON output
      },
    });

    // Parse the JSON Gemini returns
    const text = result.response.text();
    const data = JSON.parse(text);

    return data;
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    throw error;
  }
}
