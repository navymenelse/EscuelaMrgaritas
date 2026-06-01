// src/features/dashboard-roles/TeacherDashboard.jsx
import React from 'react';
import PizarronForm from '../pizarron/PizarronForm';
import PizarronList from '../pizarron/PizarronList';

const TeacherDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
        <h2 className="text-xl font-bold text-gray-800">Panel de Control: Profesores / Instructores</h2>
        <p className="text-xs text-gray-600">Gestión de objetivos formativos y evaluaciones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3">📋 Mis Clases Asignadas</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="p-2 bg-gray-50 rounded-lg">🧵 Corte y Costura (Grupo A) - Lun a Mie</li>
            <li className="p-2 bg-gray-50 rounded-lg">✂️ Peluquería Estética (Grupo B) - Jue a Vie</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-800 mb-2">📝 Carga de Calificaciones</h3>
            <p className="text-xs text-gray-500">El sistema se encuentra abierto para registrar las notas del corte actual.</p>
          </div>
          <button className="mt-4 w-full bg-amber-500 text-white py-2 rounded-xl text-sm font-semibold">
            Abrir Registro de Notas
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
  <PizarronForm rolUsuario="profesor" />
  <PizarronList rolUsuario="profesor" />
</div>

    </div>
  );
};

export default TeacherDashboard;