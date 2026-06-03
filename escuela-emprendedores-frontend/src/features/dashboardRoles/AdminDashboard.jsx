// src/features/dashboard-roles/AdminDashboard.jsx
import React, { useState } from 'react';
import PizarronForm from '../pizarron/PizarronForm';
import PizarronList from '../pizarron/PizarronList';
import GestionTablas from './GestionTablas';

const AdminDashboard = () => {
  const [openCard, setOpenCard] = useState(null);

  const cards = [
    { id: "profesores", title: "Profesores", count: "14 Activos", icon: "👨‍🏫", desc: "Gestión de nómina, asignación de cursos y horarios." },
    { id: "alumnos", title: "Alumnos", count: "185 Inscritos", icon: "🎒", desc: "Control de matrículas, asistencia y expedientes institucionales." },
    { id: "admin", title: "Administración", count: "Configuración", icon: "⚙️", desc: "Auditoría del sistema, personal y reportes socioproductivos." },
    { id: "cursos", title: "Cursos Activos", count: "8 Especialidades", icon: "📚", desc: "Planificación de matrículas, horarios y salones de clase." },
    { id: "egresados", title: "Egresados", count: "42 Graduados", icon: "🎓", desc: "Historial de certificados emitidos y actas de grado de la escuela." }
  ];

  const handleCardClick = (cardId) => {
    setOpenCard(openCard === cardId ? null : cardId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Encabezado del módulo */}
      <div className="bg-blue-50 border-l-4 border-brand-primary p-4 rounded-r-xl">
        <h2 className="text-xl font-bold text-gray-800">Panel de Control: Administración</h2>
        <p className="text-xs text-gray-600">Acceso total a la configuración del sistema escolar y base de datos.</p>
      </div>

      {/* FLUJO FLEXIBLE DE TARJETA-ACCORDION */}
      <div className="flex flex-wrap gap-4">
        {cards.map((card) => {
          const isOpen = openCard === card.id;
          const anyCardIsOpen = openCard !== null;
          const isDimmed = !isOpen && anyCardIsOpen;

          return (
            <React.Fragment key={card.id}>
              {/* TARJETA INDIVIDUAL */}
              <button
                onClick={() => handleCardClick(card.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-40 grow shrink-0 w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(20%-13px)] ${
                  isOpen
                    ? 'bg-brand-primary text-white border-brand-primary shadow-md ring-2 ring-blue-300 scale-[1.02]'
                    : isDimmed
                    ? 'bg-white/40 text-gray-300 border-gray-100 opacity-40 grayscale-[30%]'
                    : 'bg-white text-gray-800 border-gray-100 shadow-sm hover:border-gray-300 hover:shadow'
                }`}
              >
                <div className="w-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-2xl transition-transform ${isOpen ? 'scale-110' : ''} ${isDimmed ? 'opacity-30' : ''}`}>
                      {card.icon}
                    </span>
                    {/* El contador ahora se adapta dinámicamente si la tarjeta está abierta */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${
                      isOpen ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-400'
                    }`}>
                      {card.count}
                    </span>
                  </div>
                  
                  {/* TÍTULO PRINCIPAL: Cambia a blanco puro si está abierta */}
                  <h3 className={`text-sm font-bold mb-1 tracking-tight transition-colors ${
                    isOpen ? 'text-white' : 'text-gray-800'
                  }`}>
                    {card.title}
                  </h3>
                  
                  {/* DESCRIPCIÓN: Cambia a blanco sutil si está abierta para que se lea con total claridad */}
                  <p className={`text-[11px] leading-tight line-clamp-2 transition-colors ${
                    isOpen ? 'text-blue-50' : isDimmed ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {card.desc}
                  </p>
                </div>
                
                {/* BOTÓN INFERIOR: Se pinta de blanco cuando se expande */}
                <div className={`mt-2 pt-2 border-t w-full text-right text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  isOpen ? 'border-white/20 text-white' : 'border-gray-100 text-gray-400'
                }`}>
                  {isOpen ? '▲ Ocultar Tabla' : '▼ Desplegar'}
                </div>
              </button>

              {/* INYECCIÓN DE TABLA EN DISPOSITIVOS MÓVILES */}
              {isOpen && (
                <div className="w-full lg:hidden block order-none animate-fade-in">
                  <GestionTablas activeTab={openCard} />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* INYECCIÓN DE TABLA EN ESCRITORIO */}
        {openCard && (
          <div className="w-full hidden lg:block animate-fade-in pt-2">
            <GestionTablas activeTab={openCard} />
          </div>
        )}
      </div>

      {/* Bloque del Pizarrón Informativo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <PizarronForm rolUsuario="administracion" />
        <PizarronList rolUsuario="administracion" />
      </div>
    </div>
  );
};

export default AdminDashboard;