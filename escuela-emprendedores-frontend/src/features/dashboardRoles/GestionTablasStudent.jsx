// src/features/dashboard-roles/GestionTablasStudent.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const GestionTablasStudent = ({ activeTab, idUsuarioAuth }) => {
  const [alumnoPerfil, setAlumnoPerfil] = useState(null);
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const thStyle = "px-3 py-2 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200";
  const tdStyle = "px-3 py-2 text-xs text-gray-700 border-b border-gray-100 whitespace-nowrap";

  // 1. Obtener el perfil operativo del alumno basado en su ID de autenticación
  useEffect(() => {
    const obtenerPerfilAlumno = async () => {
      if (!idUsuarioAuth) return;
      try {
        const { data, error: errPerfil } = await supabase
          .from('perfiles_alumnos')
          .select('id, condicion, estado') 
          .eq('usuario_id', idUsuarioAuth)
          .maybeSingle();

        if (errPerfil) throw errPerfil;
        setAlumnoPerfil(data);
      } catch (err) {
        console.error("Error al recuperar perfil del alumno:", err.message);
        setError(err.message);
      }
    };
    obtenerPerfilAlumno();
  }, [idUsuarioAuth]);

  // 2. Consultar las asignaturas, notas y profesores en tiempo real
  useEffect(() => {
    if (!alumnoPerfil?.id) return;

    const cargarHistorialAcademico = async () => {
      try {
        setCargando(true);
        setError(null);

        // Hacemos el triple JOIN: inscripciones -> cursos -> perfiles_profesores
        const { data, error: errInsc } = await supabase
          .from('inscripciones_y_notas')
          .select(`
            id,
            nota_corte1,
            nota_corte2,
            nota_final,
            cursos (
              id,
              nombre,
              horario,
              salon,
              periodo,
              perfiles_profesores (
                nombres,
                apellidos
              )
            )
          `)
          .eq('alumno_id', alumnoPerfil.id);

        if (errInsc) throw errInsc;
        setInscripciones(data || []);
      } catch (err) {
        console.error("Error cargando materias del alumno:", err.message);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarHistorialAcademico();
  }, [activeTab, alumnoPerfil]);

  if (cargando) {
    return (
      <div className="p-8 text-center text-xs font-bold text-gray-400 uppercase tracking-wider animate-pulse">
        🍀 Sincronizando tu récord académico con el servidor institucional...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 m-2 bg-red-50 text-red-700 text-xs rounded-xl font-semibold">
        ⚠️ Error de conexión: {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden my-2 border-t-4 border-t-emerald-600">
      <div className="p-4 overflow-x-auto">
        
        {/* TABLA: CALIFICACIONES Y RENDIMIENTO */}
        {activeTab === 'notas' && (
          inscripciones.length === 0 ? (
            <p className="text-xs text-center py-6 text-gray-400">No registras calificaciones cargadas en este período.</p>
          ) : (
            <table className="w-full min-w-[650px] animate-fade-in">
              <thead>
                <tr>
                  <th className={thStyle}>Unidad Curricular / Curso</th>
                  <th className={thStyle}>Instructor</th>
                  <th className={thStyle}>Corte 1 (40%)</th>
                  <th className={thStyle}>Corte 2 (60%)</th>
                  <th className={thStyle}>Nota Final</th>
                  <th className={thStyle}>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {inscripciones.map((n) => {
                  const notaFinal = n.nota_final || 0;
                  const profesor = n.cursos?.perfiles_profesores 
                    ? `${n.cursos.perfiles_profesores.apellidos}, ${n.cursos.perfiles_profesores.nombres}`
                    : 'Por asignar';

                  return (
                    <tr key={n.id} className="hover:bg-gray-50/80">
                      <td className={`${tdStyle} font-bold text-gray-900`}>{n.cursos?.nombre}</td>
                      <td className={tdStyle}>👨‍🏫 {profesor}</td>
                      <td className={`${tdStyle} text-center`}>{n.nota_corte1 || 0} pts</td>
                      <td className={`${tdStyle} text-center`}>{n.nota_corte2 || 0} pts</td>
                      <td className={`${tdStyle} text-center font-bold text-emerald-600 bg-emerald-50/30`}>{notaFinal} pts</td>
                      <td className={tdStyle}>
                        <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                          notaFinal >= 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {notaFinal >= 10 ? 'Aprobado' : 'Reprobado'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )
        )}

        {/* TABLA: MI CRONOGRAMA DE CLASES */}
        {activeTab === 'horario' && (
          inscripciones.length === 0 ? (
            <p className="text-xs text-center py-6 text-gray-400">No registras horarios asignados.</p>
          ) : (
            <table className="w-full min-w-[600px] animate-fade-in">
              <thead>
                <tr>
                  <th className={thStyle}>Período</th>
                  <th className={thStyle}>Horario</th>
                  <th className={thStyle}>Asignatura / Taller</th>
                  <th className={thStyle}>Ambiente Asignado</th>
                </tr>
              </thead>
              <tbody>
                {inscripciones.map((h) => (
                  <tr key={h.id} className="hover:bg-gray-50/80">
                    <td className={`${tdStyle} font-bold text-emerald-700 uppercase text-[11px]`}>{h.cursos?.periodo}</td>
                    <td className={`${tdStyle} font-mono text-gray-600`}>⏰ {h.cursos?.horario || 'Sin horario'}</td>
                    <td className={`${tdStyle} font-semibold text-gray-800`}>{h.cursos?.nombre}</td>
                    <td className={tdStyle}>📍 AULA {h.cursos?.salon || 'Por definir'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {/* TABLA: EXPEDIENTE DE MATRÍCULA */}
        {activeTab === 'expediente' && (
          !alumnoPerfil ? (
            <p className="text-xs text-center py-6 text-gray-400">Expediente no localizado.</p>
          ) : (
            <table className="w-full min-w-[650px] animate-fade-in">
              <thead>
                <tr>
                  <th className={thStyle}>Fecha de Registro</th>
                  <th className={thStyle}>Modalidad</th>
                  <th className={thStyle}>Condición Actual</th>
                  <th className={thStyle}>Estatus Institucional</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className={tdStyle}>Vigente / Activo</td>
                  <td className={tdStyle}>📋 Presencial / Socioproductiva</td>
                  <td className={tdStyle}>
                    <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                      {alumnoPerfil.condicion || 'activo'}
                    </span>
                  </td>
                  <td className={tdStyle}>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                      alumnoPerfil.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {alumnoPerfil.estado || 'activo'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          )
        )}

      </div>
    </div>
  );
};

export default GestionTablasStudent;