// src/features/dashboard-roles/StudentDashboard.jsx
import React, { useState } from 'react';
import PizarronList from '../pizarron/PizarronList';
import GestionTablasStudent from './GestionTablasStudent';

const StudentDashboard = ({ idUsuarioAuth }) => { // 💡 Recibe el ID de sesión global
  const [openCard, setOpenCard] = useState(null);

  const studentCards = [
    { id: "notas", title: "Mis Calificaciones", count: "Ver Notas", icon: "📊", desc: "Revisa tus notas acumuladas de evaluaciones y promedios finales." },
    { id: "horario", title: "Mi Horario de Clases", count: "Cronograma", icon: "⏰", desc: "Consulta los días, horas y talleres asignados para tu formación." },
    { id: "expediente", title: "Estatus Académico", count: "Matrícula", icon: "📋", desc: "Detalles de tu inscripción, modalidad y condición institucional." }
  ];

  const handleCardClick = (cardId) => {
    setOpenCard(openCard === cardId ? null : cardId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-green-50 border-l-4 border-emerald-600 p-4 rounded-r-xl">
        <h2 className="text-xl font-bold text-gray-800">Mi Panel Institucional</h2>
        <p className="text-xs text-gray-600">Bienvenido a tu espacio de estudio. Aquí puedes hacer seguimiento a tus metas y aprendizajes.</p>
      </div>

      <div className="flex flex-wrap gap-4">
        {studentCards.map((card) => {
          const isOpen = openCard === card.id;
          const anyCardIsOpen = openCard !== null;
          const isDimmed = !isOpen && anyCardIsOpen;

          return (
            <React.Fragment key={card.id}>
              <button
                onClick={() => handleCardClick(card.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-40 grow shrink-0 w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] ${
                  isOpen
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-green-300 scale-[1.02]'
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
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${
                      isOpen ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-400'
                    }`}>
                      {card.count}
                    </span>
                  </div>
                  
                  <h3 className={`text-sm font-bold mb-1 tracking-tight transition-colors ${
                    isOpen ? 'text-white' : 'text-gray-800'
                  }`}>
                    {card.title}
                  </h3>
                  
                  <p className={`text-[11px] leading-tight line-clamp-2 transition-colors ${
                    isOpen ? 'text-green-50' : isDimmed ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {card.desc}
                  </p>
                </div>
                
                <div className={`mt-2 pt-2 border-t w-full text-right text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  isOpen ? 'border-white/20 text-white' : 'border-gray-100 text-gray-400'
                }`}>
                  {isOpen ? '▲ Ocultar Información' : '▼ Ver Información'}
                </div>
              </button>

              {/* MÓVIL */}
              {isOpen && (
                <div className="w-full lg:hidden block order-none animate-fade-in">
                  <GestionTablasStudent activeTab={openCard} idUsuarioAuth={idUsuarioAuth} />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* ESCRITORIO */}
        {openCard && (
          <div className="w-full hidden lg:block animate-fade-in pt-2">
            <GestionTablasStudent activeTab={openCard} idUsuarioAuth={idUsuarioAuth} />
          </div>
        )}
      </div>

      <div className="mt-8 max-w-3xl">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 px-1">
          📌 Cartelera de Anuncios Importantes
        </h3>
        <PizarronList rolUsuario="alumno" />
      </div>
    </div>
  );
};

export default StudentDashboard;