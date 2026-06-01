// src/features/pizarron/PizarronList.jsx
import React from 'react';
import { mockAnuncios } from './PizarronData';

const PizarronList = ({ rolUsuario, materiaAlumno = null }) => {
  
  // Lógica de filtrado en Frontend (Simulación de Query de Base de Datos)
  const anunciosFiltrados = mockAnuncios.filter(anuncio => {
    if (rolUsuario === 'administracion') {
      // El administrador ve absolutamente todo lo que se publica en el sistema
      return true;
    }
    if (rolUsuario === 'profesor') {
      // El profesor ve lo general, lo exclusivo de profes, y lo que él mismo publicó
      return anuncio.alcance === 'general' || anuncio.alcance === 'profesores' || anuncio.rolRemitente === 'profesor';
    }
    if (rolUsuario === 'alumno') {
      // El alumno ve lo general y lo específico de la materia que está cursando
      return anuncio.alcance === 'general' || (anuncio.alcance === 'materia' && anuncio.materiaId === materiaAlumno);
    }
    return false;
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          📌 Pizarrón Informativo Activo
        </h3>
        <span className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full font-medium">
          {anunciosFiltrados.length} anuncios
        </span>
      </div>

      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
        {anunciosFiltrados.map((anuncio) => (
          <div key={anuncio.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200/60 relative hover:border-gray-300 transition-colors">
            <div className="flex justify-between items-start gap-2 mb-1">
              <h4 className="font-bold text-sm text-gray-800">{anuncio.titulo}</h4>
              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                anuncio.alcance === 'general' ? 'bg-blue-100 text-blue-700' :
                anuncio.alcance === 'profesores' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
              }`}>
                {anuncio.alcance}
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">{anuncio.contenido}</p>
            <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium">
              <span>Por: {anuncio.remitente}</span>
              <span>{anuncio.fecha}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizarronList;

/* ======================================================================
  💡 COMENTARIOS PARA EL DESARROLLO REAL:
  ======================================================================
  Cuando usemos Supabase, este componente reemplazará el filtro .filter() 
  por un Hook useEffect que escuche cambios en tiempo real (Realtime Channel):
  
  supabase
    .channel('pizarron_cambios')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'anuncios' }, 
      payload => setAnuncios(prev => [payload.new, ...prev])
    )
    .subscribe();
*/