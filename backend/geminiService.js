import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

/**
 * Generate a trip itinerary using Gemini API
 * @param {Object} tripData - Details about the trip
 * @param {string} tripData.destination - e.g. "Las Vegas"
 * @param {number} tripData.days - e.g. 3
 * @param {string} tripData.budget - e.g. "Low"
 * @param {string} tripData.group - e.g. "Couple"
 * @returns {Promise<Object>} JSON itinerary response
 */
export async function generateTripPlan(tripData) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("❌ GEMINI_API_KEY is missing in .env file");
  }

  // ✅ Initialize Gemini client
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  console.log("✅ Gemini API initialized successfully");

  // 🧠 Build the prompt
  const prompt = `
You are an AI travel planner. Generate a detailed ${tripData.days}-day itinerary 
for a ${tripData.budget.toLowerCase()} budget trip to ${tripData.destination} 
for a ${tripData.group.toLowerCase()}.

Return the response strictly in JSON format with the following structure:

{
  "trip_title": "string",
  "budget_focus": "string",
  "hotel_options": [
    {
      "HotelName": "string",
      "HotelAddress": "string",
      "Price_Estimate_per_night": "string",
      "HotelImageUrl": "string",
      "GeoCoordinates": "string",
      "Rating": "string",
      "Description": "string"
    }
  ],
  "itinerary": {
    "Day 1": {
      "theme": "string",
      "activities": [
        {
          "placeName": "string",
          "PlaceDetails": "string",
          "PlaceImageURL": "string",
          "GeoCoordinates": "string",
          "TicketPricing": "string",
          "Rating": "string",
          "TimeTravelEachWay": "string",
          "BestTimeToVisit": "string"
        }
      ]
    }
  }
}

Requirements:
- Include 3 to 5 hotel options matching the budget and destination.
- Each day's itinerary should include 3 detailed activities.
- Each activity must contain all required fields (no missing keys).
- Ensure "TimeTravelEachWay" and "BestTimeToVisit" fields are always present.
- Do NOT include any explanations, markdown, or text outside of the JSON object.
`;

  try {
    console.log("🧭 Sending prompt to Gemini API...");

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    console.log("✅ Gemini API responded successfully");

    // 🧾 Extract clean JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn("⚠️ No JSON object found in Gemini response.");
      return { rawText: text };
    }

    let jsonData;
    try {
      jsonData = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("⚠️ JSON parsing error:", parseError);
      return { rawText: text, error: "Invalid JSON format" };
    }

    // ✅ Validate required keys
    const requiredKeys = ["trip_title", "budget_focus", "hotel_options", "itinerary"];
    const missingKeys = requiredKeys.filter((key) => !(key in jsonData));

    if (missingKeys.length > 0) {
      console.warn("⚠️ Missing keys in response:", missingKeys);
    }

    return jsonData;
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    throw new Error("Failed to generate trip plan");
  }
}
