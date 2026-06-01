// src/features/admin/AdminDashboard.jsx
import React from 'react';

const AdminDashboard = ({ onLogout }) => {
  const cards = [
    { title: "Profesores", count: "14 Activos", icon: "👨‍🏫", desc: "Gestión de nómina, asignación de cursos y horarios.", color: "border-blue-500" },
    { title: "Alumnos", count: "185 Inscritos", icon: "🎒", desc: "Control de matrículas, asistencia y expedientes académicos.", color: "border-amber-500" },
    { title: "Administración", count: "Configuración", icon: "⚙️", desc: "Auditoría de logs del sistema, roles y reportes socioproductivos.", color: "border-purple-500" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Panel de Control General</h2>
          <p className="text-sm text-gray-500">Rol: Administrador Base del Sistema</p>
        </div>
        <button 
          onClick={onLogout}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
        >
          Cerrar Sesión Admin
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            className={`bg-white p-6 rounded-2xl border-t-4 ${card.color} shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl">{card.icon}</span>
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{card.count}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{card.desc}</p>
            </div>
            <button className="w-full bg-gray-50 hover:bg-gray-100 text-brand-primary font-semibold text-sm py-2 rounded-xl transition-colors">
              Gestionar Módulo →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;