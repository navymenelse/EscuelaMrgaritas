// src/features/dashboard-roles/GestionNotasProfesor.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const GestionNotasProfesor = ({ idUsuarioAuth }) => {
  const [profesorPerfil, setProfesorPerfil] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const thStyle = "px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200 text-center";
  const tdStyle = "px-4 py-3 text-xs text-gray-700 border-b border-gray-100 whitespace-nowrap text-center";

  // 1. Obtener perfil del profesor
  useEffect(() => {
    const obtenerPerfilProfesor = async () => {
      if (!idUsuarioAuth) return;
      try {
        const { data, error } = await supabase
          .from('perfiles_profesores')
          .select('id, nombres, apellidos')
          .eq('usuario_id', idUsuarioAuth)
          .maybeSingle();

        if (error) throw error;
        setProfesorPerfil(data);
      } catch (err) {
        console.error("Error al recuperar perfil del profesor:", err.message);
      }
    };
    obtenerPerfilProfesor();
  }, [idUsuarioAuth]);

  // 2. Obtener los cursos del profesor
  useEffect(() => {
    if (!profesorPerfil?.id) return;

    const cargarCursos = async () => {
      try {
        const { data, error } = await supabase
          .from('cursos')
          .select('id, nombre, periodo, horario, salon')
          .eq('profesor_id', profesorPerfil.id);

        if (error) throw error;
        setCursos(data || []);
      } catch (err) {
        console.error("Error cargando cursos:", err.message);
      }
    };
    cargarCursos();
  }, [profesorPerfil]);

  // 3. Cargar estudiantes del curso seleccionado (Optimizado según Esquema Real de Base de Datos)
  useEffect(() => {
    if (!cursoSeleccionado) {
      setEstudiantes([]);
      return;
    }

    const cargarEstudiantes = async () => {
      try {
        setCargando(true);
        setMensaje({ tipo: '', texto: '' });

        // Consulta directa: Extraemos notas y los campos existentes en 'perfiles_alumnos'
        const { data: inscripcionesData, error: errInsc } = await supabase
          .from('inscripciones_y_notas')
          .select(`
            id,
            alumno_id,
            nota_corte1,
            nota_corte2,
            nota_final,
            perfiles_alumnos (
              nombres,
              apellidos,
              condicion,
              correo
            )
          `)
          .eq('curso_id', cursoSeleccionado);

        if (errInsc) throw errInsc;

        if (!inscripcionesData || inscripcionesData.length === 0) {
          setEstudiantes([]);
          return;
        }

        // Mapeo seguro y limpio procesando los nombres y apellidos del perfil
        const listaFormateada = inscripcionesData.map(item => {
          const perfil = item.perfiles_alumnos;
          
          // Concatenación de nombres y apellidos resguardando nulos
          const nombreCompleto = perfil 
            ? `${perfil.nombres || ''} ${perfil.apellidos || ''}`.trim() 
            : 'Estudiante no registrado';

          return {
            inscripcion_id: item.id,
            alumno_id: item.alumno_id,
            nombre: nombreCompleto || 'Estudiante sin nombre asignado',
            identificador: perfil?.correo || `ID: ${item.alumno_id?.substring(0, 8)}`,
            condicion: perfil?.condicion || 'Regular',
            nota_corte1: item.nota_corte1 || 0,
            nota_corte2: item.nota_corte2 || 0,
            nota_final: item.nota_final || 0
          };
        });

        setEstudiantes(listaFormateada);
      } catch (err) {
        console.error("Error cargando estudiantes:", err.message);
        setMensaje({ tipo: 'error', texto: 'No se pudo cargar la lista de alumnos.' });
      } finally {
        setCargando(false);
      }
    };

    cargarEstudiantes();
  }, [cursoSeleccionado]);

  // Manejar cambios en las notas locales
  const manejarCambioNota = (index, campo, valor) => {
    const notasCopiadas = [...estudiantes];
    let num = parseFloat(valor) || 0;
    if (num < 0) num = 0;
    if (num > 20) num = 20;

    notasCopiadas[index][campo] = num;

    if (campo === 'nota_corte1' || campo === 'nota_corte2') {
      const c1 = campo === 'nota_corte1' ? num : notasCopiadas[index].nota_corte1;
      const c2 = campo === 'nota_corte2' ? num : notasCopiadas[index].nota_corte2;
      // Ponderación institucional standard (40% Corte 1, 60% Corte 2)
      notasCopiadas[index].nota_final = Math.round((c1 * 0.40) + (c2 * 0.60));
    }

    setEstudiantes(notasCopiadas);
  };

  // 4. Guardar notas masivamente (Upsert controlado por ID de inscripción)
  const guardarCalificaciones = async () => {
    try {
      setGuardando(true);
      setMensaje({ tipo: '', texto: '' });

      const actualizaciones = estudiantes.map(est => ({
        id: est.inscripcion_id,
        curso_id: cursoSeleccionado,
        alumno_id: est.alumno_id,
        nota_corte1: est.nota_corte1,
        nota_corte2: est.nota_corte2,
        nota_final: est.nota_final
      }));

      const { error } = await supabase
        .from('inscripciones_y_notas')
        .upsert(actualizaciones, { onConflict: 'id' });

      if (error) throw error;

      setMensaje({ tipo: 'exito', texto: '¡Calificaciones sincronizadas con éxito!' });
    } catch (err) {
      console.error("Error guardando calificaciones:", err.message);
      setMensaje({ tipo: 'error', texto: 'Error al intentar salvar el récord de calificaciones.' });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm mb-6 border-t-4 border-t-blue-600">
        <h2 className="text-lg font-bold text-gray-800">📋 Panel de Calificaciones y Rendimiento</h2>
        <p className="text-xs text-gray-500 mt-1">
          Bienvenido, {profesorPerfil ? `${profesorPerfil.nombres} ${profesorPerfil.apellidos}` : 'Instructor'}. Seleccione una de sus cátedras asignadas para asentar notas.
        </p>

        <div className="mt-4 max-w-md">
          <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">Unidad Curricular / Curso:</label>
          <select
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
            className="w-full bg-white border border-gray-200 text-xs rounded-xl px-3 py-2.5 font-semibold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Seleccione una sección disponible --</option>
            {cursos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre} ({c.periodo}) — Aula {c.salon}
              </option>
            ))}
          </select>
        </div>
      </div>

      {mensaje.texto && (
        <div className={`p-4 mb-4 text-xs rounded-xl font-semibold shadow-sm animate-fade-in ${
          mensaje.tipo === 'exito' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {mensaje.tipo === 'exito' ? '✅' : '⚠️'} {mensaje.texto}
        </div>
      )}

      {cursoSeleccionado && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {cargando ? (
            <div className="p-12 text-center text-xs font-bold text-gray-400 uppercase tracking-wider animate-pulse">
              🍀 Recuperando nómina institucional de alumnos...
            </div>
          ) : estudiantes.length === 0 ? (
            <div className="p-12 text-center text-xs font-semibold text-gray-400">
              No se registran alumnos matriculados en esta asignatura aún.
            </div>
          ) : (
            <div className="p-4 overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200">Estudiante</th>
                    <th className={thStyle}>Identificador / Correo</th>
                    <th className={thStyle}>Condición</th>
                    <th className={thStyle}>Corte 1 (40%)</th>
                    <th className={thStyle}>Corte 2 (60%)</th>
                    <th className={thStyle}>Nota Final (Auto)</th>
                  </tr>
                </thead>
                <tbody>
                  {estudiantes.map((est, index) => (
                    <tr key={est.inscripcion_id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 text-xs font-bold text-gray-900 border-b border-gray-100 text-left">
                        {est.nombre}
                      </td>
                      <td className={tdStyle}>{est.identificador}</td>
                      <td className={tdStyle}>
                        <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                          {est.condicion}
                        </span>
                      </td>
                      <td className={tdStyle}>
                        <input
                          type="number"
                          value={est.nota_corte1}
                          min="0"
                          max="20"
                          step="0.1"
                          onChange={(e) => manejarCambioNota(index, 'nota_corte1', e.target.value)}
                          className="w-16 border border-gray-200 text-center rounded-lg p-1 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className={tdStyle}>
                        <input
                          type="number"
                          value={est.nota_corte2}
                          min="0"
                          max="20"
                          step="0.1"
                          onChange={(e) => manejarCambioNota(index, 'nota_corte2', e.target.value)}
                          className="w-16 border border-gray-200 text-center rounded-lg p-1 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className={`${tdStyle} font-bold text-sm ${est.nota_final >= 10 ? 'text-green-600' : 'text-red-500'}`}>
                        {est.nota_final} pts
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={guardarCalificaciones}
                  disabled={guardando}
                  className={`px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-md transition-all duration-200 ${
                    guardando ? 'bg-gray-400 cursor-not-allowed animate-pulse' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                  }`}
                >
                  {guardando ? '💾 Sincronizando...' : '💾 Guardar Calificaciones'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GestionNotasProfesor;