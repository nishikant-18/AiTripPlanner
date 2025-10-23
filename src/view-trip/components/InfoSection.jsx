import React from 'react'
import { IoSend } from "react-icons/io5";
import { Button } from '@/components/ui/button';
function InfoSection({ trip }) {
  return (
    <div>
        <img src='/image.png' className='h-[340px] w-full object-cover rounded-xl' alt='Trip Image' />
        <div className='flex justify-between items-center mt-5'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.destination}</h2>
                <div className='flex flex-wrap gap-5 mt-2'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-sm'>🗓️{trip.userSelection?.days} Day</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-sm'>💰{trip.userSelection?.budget} Budget </h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-sm'>🚘No. of Travelers: {trip.userSelection?.group} </h2>
                    
                
                </div>
            </div>
            <Button><IoSend /></Button>
        </div>
    </div>
  )
}

export default InfoSection