import React from 'react'
import { Link } from 'react-router-dom';
function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Recommended Hotels</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
    {trip?.tripData?.hotel_options?.map((hotel, index) => (
        <a 
    key={index} 
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.HotelAddress)}`}
    target="_blank" 
    rel="noopener noreferrer" 
    className='hover:scale-110 transition-transform border p-3 rounded-lg flex flex-col gap-3 cursor-pointer text-black'>
    {/* The content that should be clickable is now inside the <a> tag */}
    
    <div className='my-2 flex flex-col gap-2'>
        <h2 className='font-medium'>{hotel.HotelName}</h2>
        <h2 className='text-xs text-gray-500'>📍{hotel?.HotelAddress}</h2>
        <h2 className='text-sm text-gray-500'>💰{hotel?.Price_Estimate_per_night}</h2>
        <h2 className='text-sm text-gray-500'>⭐{hotel?.Rating}</h2>
        
    </div>
</a>
    ))}
</div>
    </div>
  )
}

export default Hotels