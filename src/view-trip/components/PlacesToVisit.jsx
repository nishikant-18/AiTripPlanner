import React from "react";

function PlacesToVisit({ trip }) {
  if (!trip?.tripData?.itinerary) {
    return (
      <div className="mt-8 text-gray-600 text-center">
        <p>⚠️ No itinerary data available.</p>
      </div>
    );
  }

  // Sort day keys like "Day 1", "Day 2", ...
  const sortedDays = Object.keys(trip.tripData.itinerary).sort((a, b) => {
    const dayA = parseInt(a.replace(/\D/g, ""), 10);
    const dayB = parseInt(b.replace(/\D/g, ""), 10);
    return dayA - dayB;
  });

  return (
    <div className="mt-8">
      <h2 className="font-bold text-xl mb-6">🏝️ Places to Visit</h2>

      {sortedDays.map((dayKey) => {
        const day = trip.tripData.itinerary[dayKey];
        return (
          <div key={dayKey} className="mb-10">
            <h3 className="font-semibold text-lg text-blue-700 mb-4">
              📅 {dayKey} — {day.theme || "Day Plan"}
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              {day.activities?.length > 0 ? (
                day.activities.map((place, index) => (
                  <a
                    key={index}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      place.placeName
                    )}${
                      place.GeoCoordinates
                        ? `&query_place_id=${encodeURIComponent(
                            place.GeoCoordinates
                          )}`
                        : ""
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all bg-white flex flex-col gap-2 cursor-pointer hover:scale-105"
                  >
                    <h4 className="font-semibold text-lg text-gray-800">
                      {place.placeName}
                    </h4>

                    {/* You can plug in your dynamic image here later */}
                    {/* <img
                      src="https://via.placeholder.com/400x250?text=Place+Image"
                      alt={place.placeName}
                      className="w-full h-48 object-cover rounded-lg mb-2"
                    /> */}

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {place.PlaceDetails || "No details available."}
                    </p>

                    <div className="flex flex-col gap-1 mt-2 text-xs">
                      <p className="text-green-700">
                        ⏱️ Best Time: {place.BestTimeToVisit || "N/A"}
                      </p>
                      <p className="text-yellow-700">
                        ⭐ Rating: {place.Rating || "N/A"}
                      </p>
                      <p className="text-gray-700">
                        🎟️ Ticket: {place.TicketPricing || "Free / N/A"}
                      </p>
                      <p className="text-gray-500">
                        🚗 Travel: {place.TimeTravelEachWay || "N/A"}
                      </p>
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  No activities listed for this day.
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PlacesToVisit;

