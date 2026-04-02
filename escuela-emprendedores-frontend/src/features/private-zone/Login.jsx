// src/features/private-zone/Login.jsx
import React from 'react';

const Login = () => {
  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🔐</div>
        <h2 className="text-2xl font-bold text-brand-primary">Acceso Privado</h2>
        <p className="text-gray-500 text-sm mt-2">Ingrese sus credenciales para gestionar su formación</p>
      </div>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cédula de Identidad / Correo</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
            placeholder="V-00000000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input 
            type="password" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
        <button className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-100">
          Entrar al Sistema
        </button>
      </form>
      
      <div className="mt-6 text-center text-xs text-gray-400">
        Si olvidó su contraseña o no tiene acceso, contacte a Control de Estudios.
      </div>
    </div>
  );
};

export default Login;