import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import Hotels from "../components/Hotels";
import InfoSection from "../components/InfoSection";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";
function Viewtrip() {
  const { tripId } = useParams();
    const[trip,setTrip]=useState([]);

  useEffect(() => {
    if (tripId) GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("✅ Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.warn("⚠️ No such document!");
        alert("No such trip found!");
      }
    } catch (error) {
      console.error("❌ Error fetching trip data:", error);
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        {/* Information Section */}
        <InfoSection trip={trip} />
        {/*Recommended Hotels */}
        <Hotels trip={trip}/>
        {/*Daily Plan */}
        <PlacesToVisit trip={trip} />
        {/*Footer*/}
        <Footer trip={trip} />
    </div>
  );
}

export default Viewtrip;