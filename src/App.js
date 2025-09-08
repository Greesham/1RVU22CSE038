import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import RedirectPage from "./RedirectPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:code" element={<RedirectPage />} />
    </Routes>
  );
}

export default App;
