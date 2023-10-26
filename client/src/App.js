//bro final code

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SettingsPopup from "./Components/SettingsPopup";
import "./App.css";
import Maincontent from "./Components/Maincontent";
import LoginSignup from "./Components/LoginSignupPage";
import AnswerPop from "./Components/AnswerPop";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginSignup />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<Maincontent />} />
        <Route path="/questionAnswer/:queId" element={<AnswerPop />} />
      </Routes>
    </div>
  );
}

export default App;
