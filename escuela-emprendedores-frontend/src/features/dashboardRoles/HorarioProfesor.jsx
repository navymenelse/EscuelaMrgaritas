// src/features/dashboardRoles/HorarioProfesor.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const HorarioProfesor = ({ idUsuarioAuth }) => {
  const [clases, setClases] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarHorarioDocente = async () => {
      if (!idUsuarioAuth) return;
      
      try {
        setCargando(true);

        // 1. Obtener el id del perfil del profesor usando el id de autenticación
        const { data: perfil, error: errorPerfil } = await supabase
          .from('perfiles_profesores')
          .select('id')
          .eq('usuario_id', idUsuarioAuth)
          .single();

        if (errorPerfil) throw errorPerfil;

        if (perfil) {
          // 2. Traer todos los cursos asignados a este profesor
          const { data: dataCursos, error: errorCursos } = await supabase
            .from('cursos')
            .select('id, nombre, periodo, horario, salon, estado')
            .eq('profesor_id', perfil.id);

          if (errorCursos) throw errorCursos;
          setClases(dataCursos || []);
        }
      } catch (err) {
        console.error("Error al estructurar el horario:", err.message);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarHorarioDocente();
  }, [idUsuarioAuth]);

  return (
    <div className="space-y-6 bg-gray-50/50 p-4 min-h-screen animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Mi Agenda y Horario Docente</h2>
        <p className="text-xs text-gray-500">Cronograma oficial de bloques lectivos asignados para el período actual.</p>
      </div>

      {cargando ? (
        <p className="text-xs text-center text-gray-400 font-medium">Sincronizando cronograma académico...</p>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl font-semibold">
          Error al cargar el horario: {error}
        </div>
      ) : clases.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border text-center shadow-sm max-w-md mx-auto space-y-2">
          <span className="text-4xl">📅</span>
          <h4 className="text-sm font-bold text-gray-700">Sin Cursos Asignados</h4>
          <p className="text-xs text-gray-400">Actualmente no posee cargas horarias o asignaturas vinculadas en este período escolar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clases.map((clase) => (
            <div 
              key={clase.id} 
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Indicador estético lateral */}
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-brand-primary" />

              <div className="space-y-3">
                <div className="flex justify-between items-start pl-2">
                  <span className="text-[10px] font-bold text-brand-primary bg-blue-50 px-2 py-0.5 rounded-md">
                    {clase.periodo}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    clase.estado === 'Activo' || !clase.estado ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                  }`}>
                    {clase.estado || 'Activo'}
                  </span>
                </div>

                <div className="pl-2">
                  <h3 className="text-sm font-bold text-gray-800 tracking-tight line-clamp-1">{clase.nombre}</h3>
                  <p className="text-[11px] text-gray-400 font-medium">Código Inc: <span className="font-mono text-[10px]">{clase.id.substring(0, 8)}...</span></p>
                </div>
              </div>

              {/* BLOQUE DE TIEMPO Y UBICACIÓN */}
              <div className="mt-5 pt-3 border-t border-gray-50 grid grid-cols-2 gap-2 pl-2">
                <div className="space-y-0.5">
                  <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Horario</span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-700">
                    <span>🕒</span>
                    <span className="leading-tight">{clase.horario}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Aula / Salón</span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-700">
                    <span>🏫</span>
                    <span>{clase.salon}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HorarioProfesor;