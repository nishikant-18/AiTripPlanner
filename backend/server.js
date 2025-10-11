import express from "express";
import cors from "cors";
import { generateTripPlan } from "./geminiService.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/generate-trip", async (req, res) => {
  try {
    const itinerary = await generateTripPlan(req.body);
    res.json(itinerary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate trip" });
  }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
