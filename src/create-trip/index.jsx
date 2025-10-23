import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import BudgetSelector from "@/components/ui/constants/BudgetSelector";
import { FcGoogle } from "react-icons/fc";
import { db } from "@/services/firebaseConfig";

import { doc, setDoc } from "firebase/firestore"; // ✅ changed — you were missing 'doc'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Footer from "@/view-trip/components/Footer";

function CreateTrip() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
    group: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_AUTOCOMPLETE_API;

  // ✅ Google Login setup
  const glogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Google Login Response:", response);
      GetUserProfile(response);
      setOpenDialog(false);
    },
    onError: (error) => console.log("Google Login Error:", error),
  });

  // ✅ Fetch Google Profile
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`)
      .then((response) => {
        console.log("User Profile:", response.data);
        window.localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  // ✅ Autocomplete suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=5&apiKey=${API_KEY}`
        );
        setSuggestions(response.data.features);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (place) => {
    setQuery(place.properties.formatted);
    setSuggestions([]);
    setFormData({ ...formData, destination: place.properties.formatted });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // ✅ Form submit
  const handleSubmit = async () => {
    const user = window.localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData.destination || formData.days < 3 || !formData.budget || !selectedGroup) {
      alert("Please fill in all fields (Minimum 3 days required)");
      return;
    }

    const finalData = { ...formData, group: selectedGroup };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/api/generate-trip", finalData);
      console.log("Gemini Itinerary:", response.data);

      // ✅ Save AI Trip to Firestore
      await SaveAiTrip(response.data);
    } catch (err) {
      console.error("Trip Generation Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Firestore saving logic
  const SaveAiTrip = async (tripData) => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user"));
      if (!user) {
        console.error("User not found in localStorage");
        return;
      }

      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: tripData,
        createdAt: new Date(),
        userEmail: user?.email,
        id:docId
      });

      console.log("✅ Trip saved to Firestore");
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("❌ Error saving trip:", error);
    }
  };

  return (
    <div>
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-[30px]">Tell us your travel preferences</h2>
      <h4 className="font-medium text-md mt-4 text-gray-700">
        Provide basic information, and our AI will create a personalized itinerary for you.
      </h4>

      {/* ✈️ Destination Input */}
      <div className="mt-10 relative">
        <label htmlFor="destination" className="block text-md text-gray-700 mb-2">
          Destination of your choice:
        </label>

        <input
          type="text"
          id="destination"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a city or state..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg w-full mt-1 shadow-lg max-h-60 overflow-auto">
            {suggestions.map((place) => (
              <li
                key={place.properties.place_id}
                onClick={() => handleSelect(place)}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                {place.properties.formatted}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🗓️ Number of Days */}
      <div>
        <label htmlFor="days" className="block text-md text-gray-700 mb-2 mt-6">
          Number of Travel Days:
        </label>
        <input
          type="number"
          id="days"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter number of days"
          onChange={handleInputChange}
        />
      </div>

      {/* 💰 Budget Selector */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">Choose Your Budget</label>
        <BudgetSelector onBudgetSelect={(value) => setFormData({ ...formData, budget: value })} />
      </div>

      {/* 🧍 Group Selector */}
      <div className="flex flex-col items-center mt-6">
        <label className="block text-gray-700 font-medium mb-3">
          Who are you traveling with?
        </label>

        <div className="flex justify-center gap-6 flex-wrap">
          {[
            { label: "Just Me", icon: "🧍" },
            { label: "Couple", icon: "💑" },
            { label: "Family", icon: "👨‍👩‍👧‍👦" },
            { label: "Friends", icon: "🧑‍🤝‍🧑" },
          ].map((option) => (
            <div
              key={option.label}
              onClick={() => {
                setSelectedGroup(option.label);
                setFormData((prev) => ({ ...prev, group: option.label }));
              }}
              className={`flex flex-col items-center border rounded-xl shadow-md p-4 w-24 cursor-pointer transition-all ${
                selectedGroup === option.label
                  ? "scale-105 border-blue-500 shadow-lg bg-blue-50"
                  : "hover:scale-105 hover:shadow-lg bg-white border-gray-300"
              }`}
            >
              <span className="text-2xl mb-2">{option.icon}</span>
              <p className="text-sm font-medium text-gray-700">{option.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 Submit */}
      <div className="mt-16 text-center">
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md"
        >
          {loading ? "Generating..." : "Generate Itinerary"}
        </Button>
      </div>

      {/* 🔐 Google Sign-in Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogContent>
    {/* Add DialogClose if you want explicit close button */}
    <DialogHeader className="text-center">
      <div className="flex justify-center mb-4">
        <img src="/logo.svg" alt="App Logo" className="h-20 w-20" />
      </div>

      <DialogTitle>Sign in with Google</DialogTitle>
      <DialogDescription>
        Sign in securely with your Google account to save your trips.
      </DialogDescription>
    </DialogHeader>

    <div className="mt-6">
      <Button className="w-full flex items-center gap-2" onClick={() => glogin()}>
        <FcGoogle className="text-xl" />
        Sign in with Google
      </Button>
    </div>
  </DialogContent>
</Dialog>
          
    </div>
    <Footer/>
    </div>
  );
}

export default CreateTrip;
