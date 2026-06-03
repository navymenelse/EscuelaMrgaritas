// src/features/dashboard-roles/TeacherDashboard.jsx
import React, { useState } from 'react';
import PizarronForm from '../pizarron/PizarronForm';
import PizarronList from '../pizarron/PizarronList';
import GestionTablasTeacher from './GestionTablasTeacher';

const TeacherDashboard = () => {
  // Guardamos el ID de la tarjeta del profesor que esté abierta (null = todas cerradas)
  const [openCard, setOpenCard] = useState(null);

  const teacherCards = [
    { id: "secciones", title: "Mis Cursos Asignados", count: "2 Secciones", icon: "📚", desc: "Listado de especialidades socioproductivas bajo tu instrucción." },
    { id: "alumnos", title: "Control de Notas", count: "Calificar", icon: "📝", desc: "Carga de evaluaciones continuas y actas finales de alumnos." },
    { id: "horario", title: "Horario Docente", count: "Planificación", icon: "⏰", desc: "Distribución horaria semanal y ambientes de aprendizaje asignados." }
  ];

  const handleCardClick = (cardId) => {
    setOpenCard(openCard === cardId ? null : cardId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Encabezado del módulo del Profesor */}
      <div className="bg-orange-50 border-l-4 border-brand-secondary p-4 rounded-r-xl">
        <h2 className="text-xl font-bold text-gray-800">Panel de Control: Instructor</h2>
        <p className="text-xs text-gray-600">Gestión pedagógica, seguimiento de estudiantes y planificación de clases.</p>
      </div>

      {/* FLUJO FLEXIBLE DE TARJETA-ACCORDION CON EFECTO INVERSO */}
      <div className="flex flex-wrap gap-4">
        {teacherCards.map((card) => {
          const isOpen = openCard === card.id;
          const anyCardIsOpen = openCard !== null;
          const isDimmed = !isOpen && anyCardIsOpen;

          return (
            <React.Fragment key={card.id}>
              {/* TARJETA INDIVIDUAL */}
              <button
                onClick={() => handleCardClick(card.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-40 grow shrink-0 w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] ${
                  isOpen
                    ? 'bg-brand-secondary text-white border-brand-secondary shadow-md ring-2 ring-orange-300 scale-[1.02]'
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
                  
                  {/* TÍTULO: Garantiza protagonismo al cambiar a blanco puro al activarse */}
                  <h3 className={`text-sm font-bold mb-1 tracking-tight transition-colors ${
                    isOpen ? 'text-white' : 'text-gray-800'
                  }`}>
                    {card.title}
                  </h3>
                  
                  {/* DESCRIPCIÓN: Cambia a tono claro legible sobre el fondo naranja */}
                  <p className={`text-[11px] leading-tight line-clamp-2 transition-colors ${
                    isOpen ? 'text-orange-50' : isDimmed ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {card.desc}
                  </p>
                </div>
                
                {/* INDICADOR INFERIOR DE ACCIÓN */}
                <div className={`mt-2 pt-2 border-t w-full text-right text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  isOpen ? 'border-white/20 text-white' : 'border-gray-100 text-gray-400'
                }`}>
                  {isOpen ? '▲ Ocultar Tabla' : '▼ Desplegar'}
                </div>
              </button>

              {/* DESPLIEGUE RESPONSIVO DE TABLA EN MÓVILES (INMEDIATAMENTE DEBAJO) */}
              {isOpen && (
                <div className="w-full lg:hidden block order-none animate-fade-in">
                  <GestionTablasTeacher activeTab={openCard} />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* DESPLIEGUE EN ESCRITORIO (DEBAJO DE LA LÍNEA DE TARJETAS) */}
        {openCard && (
          <div className="w-full hidden lg:block animate-fade-in pt-2">
            <GestionTablasTeacher activeTab={openCard} />
          </div>
        )}
      </div>

      {/* Bloque del Pizarrón Informativo (Común para la visualización del docente) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <PizarronForm rolUsuario="profesores" />
        <PizarronList rolUsuario="profesores" />
      </div>
    </div>
  );
};

export default TeacherDashboard;