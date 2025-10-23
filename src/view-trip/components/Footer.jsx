import React from "react";

function Footer() {
  return (
    <footer className="relative mt-20 bg-gradient-to-b from-blue-100 via-white to-gray-50 text-gray-800 border-t border-blue-200">
      {/* Top Wave Decoration */}
      <div className="absolute -top-6 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-6 text-blue-200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M985.66 92.83c-65.98 14.64-136.2 26.22-212.88 27.62-107.86 2.01-195.33-14.54-301.32-21.73C358.91 91.26 261.07 105.22 164.36 120H0V0h1200v120h-214.34z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 🧭 Logo + Tagline */}
          <div>
            
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Plan smarter, travel better 🌍  
              Your personal AI companion for dream journeys — powered by data,
              crafted with imagination.
            </p>
          </div>

          {/* 🌐 Explore */}
          <div>
            <h3 className="font-semibold mb-3 text-blue-800">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-600 cursor-pointer">Destinations</li>
              <li className="hover:text-blue-600 cursor-pointer">Create a Trip</li>
              <li className="hover:text-blue-600 cursor-pointer">Travel Guides</li>
              <li className="hover:text-blue-600 cursor-pointer">AI Recommender</li>
            </ul>
          </div>

          {/* 🧳 Resources */}
          <div>
            <h3 className="font-semibold mb-3 text-blue-800">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-600 cursor-pointer">Blog</li>
              <li className="hover:text-blue-600 cursor-pointer">Pricing</li>
              <li className="hover:text-blue-600 cursor-pointer">FAQs</li>
              <li className="hover:text-blue-600 cursor-pointer">Support</li>
            </ul>
          </div>

          {/* 💌 Stay Connected */}
          <div>
            <h3 className="font-semibold mb-3 text-blue-800">Stay Connected</h3>
            <p className="text-sm text-gray-600 mb-3">
              Subscribe for travel inspiration, updates, and AI-powered itineraries.
            </p>
            <div className="flex">
              
            </div>
          </div>
        </div>

        {/* 🌈 Divider */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} AI Trip Planner · Built with ❤️ for wanderers
          </p>
          <div className="flex justify-center gap-5 mt-3 text-lg text-blue-700">
            <i className="ri-facebook-circle-fill hover:text-blue-500 cursor-pointer"></i>
            <i className="ri-instagram-fill hover:text-pink-500 cursor-pointer"></i>
            <i className="ri-twitter-x-fill hover:text-gray-800 cursor-pointer"></i>
            <i className="ri-linkedin-box-fill hover:text-blue-600 cursor-pointer"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
