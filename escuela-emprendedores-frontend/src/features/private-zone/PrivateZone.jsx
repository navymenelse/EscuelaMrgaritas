// src/features/private-zone/PrivateZone.jsx
import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

const PrivateZone = () => {
  // Simulación de estado de sesión (KISS)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-[60vh]">
      {!isLoggedIn ? (
        <div className="space-y-6">
          <Login />
          <div className="text-center">
            <button 
              onClick={() => setIsLoggedIn(true)} 
              className="text-xs text-gray-400 hover:underline"
            >
              (Demo: Simular Inicio de Sesión)
            </button>
          </div>
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default PrivateZone;