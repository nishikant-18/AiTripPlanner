import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../button'
import Footer from '@/view-trip/components/Footer'
function Hero() {
  return (
    <div className='flex flex-col  items-center mx-56 gap-9'>
        <h1 className=' font-extrabold text-[50px] text-center mt-16'>
            <span className='text-red-600'>Your Smartest Travel Companion :</span><br/> Plan Trips Effortlessly
            
        </h1>
        <h4 className='mt-2 font-bold text-center text-gray-700'>“Let our AI take the stress out of travel planning. From finding the best destinations and flights to creating personalized itineraries, we make sure your journey is smarter, smoother, and tailored just for you.”</h4>
    <Link to={'/create-trip'}>
        <Button  className='mt-4 mb-6'>Get Started</Button>
    </Link>
    <Footer/>
    </div>
    
  )
}

export default Hero