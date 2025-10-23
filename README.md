Absolutely! Here’s a **full, detailed README** for your project, covering frontend, backend, setup, deployment, and usage. You can directly use or adjust it for your GitHub repo.

---

# AI Trip Planner 🌍✈️

An AI-powered travel planner that generates personalized itineraries based on user preferences. Users can select destinations, travel days, budget, and group type, and get AI-generated itineraries. The app also supports Google authentication to save trips and view them later.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Installation](#installation)

  * [Frontend](#frontend)
  * [Backend](#backend)
* [Environment Variables](#environment-variables)
* [Running Locally](#running-locally)
* [Deployment](#deployment)
* [Usage](#usage)
* [Screenshots](#screenshots)
* [License](#license)

---

## Features

* AI-generated travel itineraries via Gemini API.
* Autocomplete destination input using Geoapify API.
* Budget selection and group type selection.
* Google OAuth2 sign-in for saving trips.
* Save and view trips using Firebase Firestore.
* Responsive UI built with React, TailwindCSS, and Vite.

---

## Tech Stack

**Frontend:** React, Vite, TailwindCSS, React Router, Google OAuth2
**Backend:** Node.js, Express, Axios (for Gemini API)
**Database:** Firebase Firestore
**Deployment:** Vercel (Frontend & Backend)

---



## Installation

### Frontend

1. Clone the repository:

```bash
git clone https://github.com/nishikant-18/AiTripPlanner.git
cd AiTripPlanner
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Your app should now run at `http://localhost:5173/` (or the URL Vite shows in the console).

---

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your API keys (see [Environment Variables](#environment-variables)).

4. Start the backend server:

```bash
npm run dev   # or node server.js
```

Your backend server will run on `http://localhost:4000/` by default.

---

## Environment Variables

Create `.env` files for **frontend** and **backend** with the following keys:

### Frontend (`.env`)

```env
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_client_id
VITE_AUTOCOMPLETE_API=your_geoapify_api_key
VITE_BACKEND_URL=http://localhost:4000
```

### Backend (`backend/.env`)

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=4000
```


## Running Locally

1. Start the backend:

```bash
cd backend
npm run dev
```

2. Start the frontend:

```bash
npm install
npm run dev
```

3. Open your browser at `http://localhost:5173/` and start using the app.

---

## Deployment

**Frontend & Backend on Vercel**

1. Push your changes to GitHub.
2. Import the repo into Vercel for deployment.
3. Set **Environment Variables** in Vercel for both frontend and backend.

   * For backend: `GEMINI_API_KEY`, `PORT`
   * For frontend: `VITE_GOOGLE_AUTH_CLIENT_ID`, `VITE_AUTOCOMPLETE_API`, `VITE_BACKEND_URL`
4. Deploy both frontend and backend.
5. Update `VITE_BACKEND_URL` in frontend to your deployed backend URL.

**Example Axios call:**

```js
axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/generate-trip`, finalData)
```

---

## Usage

1. Go to the deployed frontend.
2. Sign in with Google to save trips.
3. Enter your destination, travel days, budget, and group type.
4. Click **Generate Itinerary** to receive an AI-generated travel plan.
5. View your trips in the **My Trips** section.

---



---

## License

MIT License © 2025 Nishikant

