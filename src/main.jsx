import React from 'react'
import Header from './components/ui/customs/Header'
import CreateTrip from './create-trip/index.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'  
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    
    <RouterProvider router={router} />
  </StrictMode>,
)
