// src/features/dashboard-roles/AdminDashboard.jsx
import React from 'react';
import PizarronForm from '../pizarron/PizarronForm';
import PizarronList from '../pizarron/PizarronList';

const AdminDashboard = () => {
  const cards = [
    { title: "Profesores", count: "14 Activos", icon: "👨‍🏫", desc: "Gestión de nómina, asignación de cursos y horarios." },
    { title: "Alumnos", count: "185 Inscritos", icon: "🎒", desc: "Control de matrículas, asistencia y expedientes." },
    { title: "Administración", count: "Configuración", icon: "⚙️", desc: "Auditoría del sistema y reportes socioproductivos." }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-blue-50 border-l-4 border-brand-primary p-4 rounded-r-xl">
        <h2 className="text-xl font-bold text-gray-800">Panel de Control: Administración</h2>
        <p className="text-xs text-gray-600">Acceso total a la configuración del sistema escolar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl">{card.icon}</span>
              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">{card.count}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{card.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
  <PizarronForm rolUsuario="administracion" />
  <PizarronList rolUsuario="administracion" />
</div>
    </div>
  );
};

export default AdminDashboard;