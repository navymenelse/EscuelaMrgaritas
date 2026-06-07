// src/components/common/ConfiguradorHorario.jsx
import React from 'react';

const ConfiguradorHorario = ({ 
  diasSeleccionados, 
  onToggleDia, 
  horaInicio, 
  onHoraInicioChange, 
  horaFin, 
  onHoraFinChange 
}) => {
  
  const diasSemana = [
    { id: 'Lunes', label: 'L' },
    { id: 'Martes', label: 'M' },
    { id: 'Miércoles', label: 'M' },
    { id: 'Jueves', label: 'J' },
    { id: 'Viernes', label: 'V' },
    { id: 'Sábado', label: 'S' },
    { id: 'Domingo', label: 'D' }
  ];

  return (
    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 space-y-3">
      <label className="block text-[10px] font-bold text-gray-400 uppercase">
        Frecuencia Semanal (Días)
      </label>
      
      <div className="flex justify-between gap-1">
        {diasSemana.map((dia) => {
          const seleccionado = diasSeleccionados.includes(dia.id);
          return (
            <button
              key={dia.id}
              type="button"
              onClick={() => onToggleDia(dia.id)}
              className={`w-7 h-7 rounded-full text-[10px] font-bold transition-all ${
                seleccionado 
                  ? 'bg-brand-secondary text-white shadow-sm scale-105' 
                  : 'bg-white text-gray-400 border border-gray-200 hover:border-gray-300'
              }`}
              title={dia.id}
            >
              {dia.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <div>
          <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Entrada</label>
          <input
            type="time"
            value={horaInicio}
            onChange={(e) => onHoraInicioChange(e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-200 rounded-lg outline-none bg-white font-medium"
          />
        </div>
        <div>
          <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Salida</label>
          <input
            type="time"
            value={horaFin}
            onChange={(e) => onHoraFinChange(e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-200 rounded-lg outline-none bg-white font-medium"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfiguradorHorario;