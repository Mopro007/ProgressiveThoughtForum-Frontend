import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Article from "./pages/Article";
import articles from "./articles";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<Article articles={articles}/>} />
      </Routes>
    </Router>
  );
}

export default App;
