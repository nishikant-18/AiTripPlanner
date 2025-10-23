import React from 'react'

function UserTripCardItem({ trip }) {
  return (
    <div>
      <div className='text-xl font-semibold'>{trip.trip_title}</div>
      
    </div>
  )
}

export default UserTripCardItem