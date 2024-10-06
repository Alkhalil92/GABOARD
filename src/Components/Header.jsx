// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">GABOARD</h1>
        <nav dir='ltr'>
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/GasSensore">
            <Button variant="ghost">Gas Sensor Dashboard</Button>
          </Link>
          <Link to="/GreenHouse">
            <Button variant="ghost">Greenhouse Gas Analysis Dashboard</Button>
          </Link>
          <Link to="/MethaneAnalysisDashboard">
            <Button variant="ghost">Comprehensive Emissions Analysis Dashboard</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
