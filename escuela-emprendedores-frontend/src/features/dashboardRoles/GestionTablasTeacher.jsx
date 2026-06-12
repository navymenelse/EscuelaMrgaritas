// src/features/dashboard-roles/GestionTablasTeacher.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const GestionTablasTeacher = ({ activeTab, idUsuarioAuth }) => {
  const [profesorId, setProfesorId] = useState(null);
  const [secciones, setSecciones] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const thStyle = "px-3 py-2 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200";
  const tdStyle = "px-3 py-2 text-xs text-gray-700 border-b border-gray-100 whitespace-nowrap";

  // 1. Obtener el id real del perfil del profesor usando su cuenta auth
  useEffect(() => {
    const obtenerPerfilProfesor = async () => {
      if (!idUsuarioAuth) return;
      try {
        const { data, error: errPerfil } = await supabase
          .from('perfiles_profesores')
          .select('id')
          .eq('usuario_id', idUsuarioAuth)
          .single();

        if (errPerfil) throw errPerfil;
        if (data) setProfesorId(data.id);
      } catch (err) {
        console.error("Error obteniendo perfil docente:", err.message);
        setError(err.message);
      }
    };
    obtenerPerfilProfesor();
  }, [idUsuarioAuth]);

  // 2. Cargar dinámicamente según la pestaña activa
  useEffect(() => {
    if (!profesorId) return;

    const cargarDatosProfesor = async () => {
      try {
        setCargando(true);
        setError(null);

        if (activeTab === 'secciones' || activeTab === 'horario') {
          // Extraemos los cursos asignados a este profesor
          const { data: dataCursos, error: errCursos } = await supabase
            .from('cursos')
            .select('*')
            .eq('profesor_id', profesorId);

          if (errCursos) throw errCursos;

          // Para cada curso, contamos cuántos alumnos se han inscrito en la tabla intermedia
          const cursosConMatricula = await Promise.all((dataCursos || []).map(async (curso) => {
            const { count, error: errCount } = await supabase
              .from('inscripciones_y_notas')
              .select('*', { count: 'exact', head: true })
              .eq('curso_id', curso.id);
            
            return {
              ...curso,
              matricula: errCount ? 0 : count || 0
            };
          }));

          setSecciones(cursosConMatricula);
        }

        if (activeTab === 'alumnos') {
          // Buscamos los alumnos inscritos en los cursos dictados por este profesor
          const { data: inscripciones, error: errInsc } = await supabase
            .from('inscripciones_y_notas')
            .select(`
              id,
              evaluacion1,
              evaluacion2,
              nota_final,
              cursos!inner(id, nombre, profesor_id),
              perfiles_alumnos(id, nombres, apellidos, usuarios(cedula))
            `)
            .eq('cursos.profesor_id', profesorId);

          if (errInsc) throw errInsc;
          setAlumnos(inscripciones || []);
        }

      } catch (err) {
        console.error("Error al poblar tablas:", err.message);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarDatosProfesor();
  }, [activeTab, profesorId]);

  if (cargando) {
    return (
      <div className="p-8 text-center text-xs font-bold text-gray-400 uppercase tracking-wider animate-pulse">
        🔄 Consultando registros académicos en la nube...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 m-2 bg-red-50 text-red-700 text-xs rounded-xl font-semibold">
        ⚠️ Error de sincronización: {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden my-2 border-t-4 border-t-brand-secondary">
      <div className="p-4 overflow-x-auto">
        
        {/* TABLA: MIS SECCIONES ASIGNADAS */}
        {activeTab === 'secciones' && (
          secciones.length === 0 ? (
            <p className="text-xs text-center py-6 text-gray-400">No tienes asignaturas asignadas en este ciclo.</p>
          ) : (
            <table className="w-full min-w-[600px] animate-fade-in">
              <thead>
                <tr>
                  <th className={thStyle}>Código</th>
                  <th className={thStyle}>Especialidad / Curso</th>
                  <th className={thStyle}>Ambiente/Salón</th>
                  <th className={thStyle}>Horario asignado</th>
                  <th className={thStyle}>Matrícula</th>
                </tr>
              </thead>
              <tbody>
                {secciones.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/80">
                    <td className={`${tdStyle} font-mono font-bold text-brand-secondary`}>{s.id.substring(0, 8).toUpperCase()}</td>
                    <td className={`${tdStyle} font-semibold text-gray-900`}>{s.nombre}</td>
                    <td className={tdStyle}>AULA {s.salon || 'Por definir'}</td>
                    <td className={tdStyle}>🕒 {s.horario || 'Sin horario asignado'}</td>
                    <td className={tdStyle}>
                      <span className="bg-orange-50 text-brand-secondary font-bold px-2 py-0.5 rounded text-[11px]">
                        {s.matricula} Alumnos
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {/* TABLA: LISTADO DE ALUMNOS Y CALIFICACIONES */}
        {activeTab === 'alumnos' && (
          alumnos.length === 0 ? (
            <p className="text-xs text-center py-6 text-gray-400">No hay alumnos inscritos en tus secciones de clase todavía.</p>
          ) : (
            <table className="w-full min-w-[700px] animate-fade-in">
              <thead>
                <tr>
                  <th className={thStyle}>Cédula</th>
                  <th className={thStyle}>Estudiante</th>
                  <th className={thStyle}>Curso Inscrito</th>
                  <th className={thStyle}>Eval 1 (40%)</th>
                  <th className={thStyle}>Eval 2 (60%)</th>
                  <th className={thStyle}>Nota Final</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((a) => {
                  const cedulaStr = a.perfiles_alumnos?.usuarios?.cedula || 'N/A';
                  const nombreCompleto = `${a.perfiles_alumnos?.apellidos || ''}, ${a.perfiles_alumnos?.nombres || ''}`;
                  const notaFinalVal = a.nota_final || 0;

                  return (
                    <tr key={a.id} className="hover:bg-gray-50/80">
                      <td className={`${tdStyle} font-semibold text-gray-500`}>{cedulaStr}</td>
                      <td className={`${tdStyle} font-bold text-gray-800`}>{nombreCompleto}</td>
                      <td className={tdStyle}>{a.cursos?.nombre}</td>
                      <td className={`${tdStyle} text-center font-medium text-blue-600`}>{a.evaluacion1 || 0} pts</td>
                      <td className={`${tdStyle} text-center font-medium text-blue-600`}>{a.evaluacion2 || 0} pts</td>
                      <td className={`${tdStyle} text-center`}>
                        <span className={`font-bold px-2 py-0.5 rounded ${
                          Number(notaFinalVal) >= 10 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {notaFinalVal} pts
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )
        )}

        {/* TABLA: CRONOGRAMA SEMANAL DE HORARIOS (Reutiliza la data de cursos ordenadamente) */}
        {activeTab === 'horario' && (
          secciones.length === 0 ? (
            <p className="text-xs text-center py-6 text-gray-400">No hay bloques registrados en tu agenda semanal.</p>
          ) : (
            <table className="w-full min-w-[650px] animate-fade-in">
              <thead>
                <tr>
                  <th className={thStyle}>Período</th>
                  <th className={thStyle}>Bloque de Horas asignado</th>
                  <th className={thStyle}>Actividad Académica / Aula</th>
                </tr>
              </thead>
              <tbody>
                {secciones.map((h) => (
                  <tr key={h.id} className="hover:bg-gray-50/80">
                    <td className={`${tdStyle} font-bold text-brand-secondary uppercase text-[11px]`}>{h.periodo}</td>
                    <td className={`${tdStyle} font-mono text-gray-600`}>⏰ {h.horario || 'Por asignar'}</td>
                    <td className={tdStyle}>
                      Clase magistral de <span className="font-bold text-gray-900">{h.nombre}</span> en el <span className="font-semibold text-brand-primary">Salón {h.salon || 'TBD'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

      </div>
    </div>
  );
};

export default GestionTablasTeacher;