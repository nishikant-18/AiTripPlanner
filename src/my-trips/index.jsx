import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/services/firebaseConfig";
import { query, collection, where, getDocs } from "firebase/firestore";

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      const tripsData = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        tripsData.push({ id: doc.id, ...doc.data() });
      });

      setTrips(tripsData);
    } catch (error) {
      console.error("Error fetching user trips:", error);
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-56 xl:px-72 mt-10">
      <h2 className="text-3xl font-bold mb-6">My Trips</h2>

      {trips.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip, index) => (
            <div
              key={index}
              className="border rounded-xl shadow-sm hover:shadow-md p-5 bg-white cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate(`/view-trip/${trip.id}`)}
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                {trip?.userSelection?.destination || "Unknown Destination"}
              </h3>
              <p className="text-sm text-gray-600">
                🗓️ {trip?.userSelection?.days} Days | 💰{" "}
                {trip?.userSelection?.budget} | 👥{" "}
                {trip?.userSelection?.group} Travellers
              </p>
              <p className="text-xs text-gray-500 mt-3">
                ✨ Created on:{" "}
                {trip?.createdAt
                  ? new Date(trip.createdAt.seconds * 1000).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-5">You don’t have any saved trips yet.</p>
      )}
    </div>
  );
}

export default MyTrips;
