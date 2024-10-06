// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import './App.css'; // Assuming you have some global styles here
import PersonalWebsite from './Components/PersonalWebsite';
import Header from './Components/Header';
import GasSensorDashboard from './Components/GasSensorDashboard';
import GreenHouseGasesDashboard from './Components/GreenHouseGases';
import MethaneAnalysisDashboard from './Components/MethanAnalaysis';

function App() {
  return (
    <Router>
      <div>
         <Header />

         <Routes>
           <Route path="/" element={<PersonalWebsite />} /> 
           <Route path="/GasSensore" element={<GasSensorDashboard />} /> 
           <Route path="/GreenHouse" element={<GreenHouseGasesDashboard />} /> 
           <Route path="/MethaneAnalysisDashboard" element={<MethaneAnalysisDashboard />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
