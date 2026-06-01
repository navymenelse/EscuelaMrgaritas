// src/features/pizarron/PizarronForm.jsx
import React, { useState } from 'react';

const PizarronForm = ({ rolUsuario }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [alcance, setAlcance] = useState(rolUsuario === 'profesor' ? 'materia' : 'general');

  const handlePublicar = (e) => {
    e.preventDefault();
    alert(`Simulación de envío:\nTítulo: ${titulo}\nAlcance: ${alcance}\n\nEn la etapa de backend, esto ejecutará un INSERT directo en la base de datos.`);
    setTitulo('');
    setContenido('');
  };

  return (
    <form onSubmit={handlePublicar} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <h3 className="font-bold text-gray-800 flex items-center gap-2">
        📣 Escribir en el Pizarrón
      </h3>
      
      <div className="space-y-3">
        <input 
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título del anuncio..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-primary"
          required
        />
        <textarea 
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Escriba la información detallada aquí..."
          rows="3"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-primary"
          required
        ></textarea>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <label className="text-[11px] font-semibold text-gray-500 mr-2">Enviar a:</label>
            <select 
              value={alcance} 
              onChange={(e) => setAlcance(e.target.value)}
              className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs font-medium text-gray-700 outline-none"
            >
              {rolUsuario === 'administracion' && (
                <>
                  <option value="general">Todos (General)</option>
                  <option value="profesores">Solo Profesores</option>
                </>
              )}
              {rolUsuario === 'profesor' && (
                <option value="materia">Mi Materia Asignada</option>
              )}
            </select>
          </div>

          <button type="submit" className="w-full sm:w-auto bg-brand-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors">
            Publicar Anuncio
          </button>
        </div>
      </div>
    </form>
  );
};

export default PizarronForm;