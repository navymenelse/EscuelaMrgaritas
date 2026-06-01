// src/features/dashboard-roles/StudentDashboard.jsx
import React from 'react';

const StudentDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
        <h2 className="text-xl font-bold text-gray-800">Panel de Control: Alumnos</h2>
        <p className="text-xs text-gray-600">Consulta de material didáctico y estatus escolar.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">📚 Mis Recursos de Aprendizaje</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-sm">
            <span>📕 Guía de Patronaje Industrial.pdf</span>
            <button className="text-brand-primary font-bold">Descargar</button>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-sm">
            <span>📘 Manual de Costura y Acabados.pdf</span>
            <button className="text-brand-primary font-bold">Descargar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;