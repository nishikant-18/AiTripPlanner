import React, { useState } from "react";
import "./App.css";
import Hero from "./components/ui/customs/Hero";
import Header from "./components/ui/customs/Header";  // ✅ import Header here

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />      {/* ✅ Header now inside Router */}
      <Hero />
    </>
  );
}

export default App;

