// src/features/dashboardRoles/AsignacionSecciones.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const AsignacionSecciones = () => {
  // Datos cargados de la BD
  const [cursos, setCursos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [alumnosInscritos, setAlumnosInscritos] = useState([]);

  // Selecciones del usuario
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [profesorAsignado, setProfesorAsignado] = useState('');
  const [alumnoParaInscribir, setAlumnoParaInscribir] = useState('');

  // Estados de UI
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Cargar catálogos iniciales
  const cargarCatalogos = async () => {
    try {
      setCargando(true);
      
      // 1. Obtener cursos
      const { data: dataCursos } = await supabase.from('cursos').select('*');
      setCursos(dataCursos || []);

      // 2. Obtener profesores
      const { data: dataProfs } = await supabase.from('perfiles_profesores').select('id, nombres, apellidos');
      setProfesores(dataProfs || []);

      // 3. Obtener alumnos disponibles
      const { data: dataAlumnos } = await supabase.from('perfiles_alumnos').select('id, nombres, apellidos');
      setAlumnos(dataAlumnos || []);

    } catch (err) {
      console.error("Error cargando catálogos:", err.message);
    } finally {
      setCargando(false);
    }
  };

  // Cargar los alumnos que ya pertenecen al curso seleccionado
  const cargarAlumnosDelCurso = async (cursoId) => {
    if (!cursoId) {
      setAlumnosInscritos([]);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('inscripciones_y_notas')
        .select(`
          id,
          perfiles_alumnos ( id, nombres, apellidos )
        `)
        .eq('curso_id', cursoId);

      if (error) throw error;
      setAlumnosInscritos(data || []);
    } catch (err) {
      console.error("Error al buscar alumnos del curso:", err.message);
    }
  };

  useEffect(() => {
    cargarCatalogos();
  }, []);

  // Manejar el cambio de curso en el selector
  const handleCursoChange = (cursoId) => {
    setCursoSeleccionado(cursoId);
    const cursoObj = cursos.find(c => c.id === cursoId);
    // Si el curso ya tiene un profesor asignado en la BD, lo precargamos
    setProfesorAsignado(cursoObj?.profesor_id || '');
    cargarAlumnosDelCurso(cursoId);
  };

  // ACCIÓN 1: Asignar o Cambiar Profesor del Curso
  const handleAsignarProfesor = async () => {
    if (!cursoSeleccionado) {
      setMensaje({ texto: 'Seleccione un curso primero.', tipo: 'error' });
      return;
    }
    try {
      setMensaje({ texto: 'Actualizando profesor titular...', tipo: 'info' });
      
      const { error } = await supabase
        .from('cursos')
        .update({ profesor_id: profesorAsignado || null })
        .eq('id', cursoSeleccionado);

      if (error) throw error;

      // Actualizar estado local de cursos
      setCursos(cursos.map(c => c.id === cursoSeleccionado ? { ...c, profesor_id: profesorAsignado } : c));
      setMensaje({ texto: '👨‍🏫 Profesor asignado al curso con éxito.', tipo: 'exito' });
    } catch (err) {
      setMensaje({ texto: err.message, tipo: 'error' });
    }
  };

  // ACCIÓN 2: Inscribir un Alumno al Curso Seleccionado
  const handleInscribirAlumno = async (e) => {
    e.preventDefault();
    if (!cursoSeleccionado || !alumnoParaInscribir) {
      setMensaje({ texto: 'Seleccione el curso y el estudiante.', tipo: 'error' });
      return;
    }

    // Evitar duplicados visuales/lógicos locales antes de ir a Postgres
    const yaInscrito = alumnosInscritos.some(item => item.perfiles_alumnos?.id === alumnoParaInscribir);
    if (yaInscrito) {
      setMensaje({ texto: 'Este alumno ya se encuentra inscrito en este curso.', tipo: 'error' });
      return;
    }

    try {
      setMensaje({ texto: 'Inscribiendo estudiante...', tipo: 'info' });

      const { error } = await supabase
        .from('inscripciones_y_notas')
        .insert([
          {
            curso_id: cursoSeleccionado,
            alumno_id: alumnoParaInscribir
          }
        ]);

      if (error) throw error;

      setMensaje({ texto: '🎓 Alumno agregado a la sección correctamente.', tipo: 'exito' });
      setAlumnoParaInscribir('');
      cargarAlumnosDelCurso(cursoSeleccionado);
    } catch (err) {
      setMensaje({ texto: err.message, tipo: 'error' });
    }
  };

  return (
    <div className="space-y-6 bg-gray-50/50 p-4 min-h-screen">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Asignación y Control de Secciones</h2>
        <p className="text-xs text-gray-500">Vincula profesores titulares a las asignaturas y gestiona la lista de alumnos inscritos.</p>
      </div>

      {cargando ? (
        <p className="text-xs text-center text-gray-400">Sincronizando registros académicos...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* PANEL DE CONTROL CENTRAL */}
          <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-6 h-fit">
            
            {/* 1. SELECCIÓN DE CURSO */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase">1. Seleccionar Curso / Sección</label>
              <select
                value={cursoSeleccionado}
                onChange={(e) => handleCursoChange(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40 font-bold text-gray-800"
              >
                <option value="">-- Seleccione una sección --</option>
                {cursos.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre} ({c.periodo})</option>
                ))}
              </select>
            </div>

            {/* 2. GESTIÓN DEL PROFESOR */}
            <div className="space-y-2 border-t pt-4">
              <label className="block text-[10px] font-bold text-gray-400 uppercase">2. Profesor Asignado</label>
              <div className="flex gap-2">
                <select
                  value={profesorAsignado}
                  onChange={(e) => setProfesorAsignado(e.target.value)}
                  disabled={!cursoSeleccionado}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40 font-medium disabled:opacity-50"
                >
                  <option value="">-- Sin profesor asignado --</option>
                  {profesores.map(p => (
                    <option key={p.id} value={p.id}>{p.apellidos}, {p.nombres}</option>
                  ))}
                </select>
                <button
                  onClick={handleAsignarProfesor}
                  disabled={!cursoSeleccionado}
                  className="px-3 bg-gray-800 text-white text-xs font-bold rounded-xl hover:bg-gray-700 disabled:opacity-50"
                >
                  Vincular
                </button>
              </div>
            </div>

            {/* 3. INSCRIPCIÓN DE ALUMNOS */}
            <form onSubmit={handleInscribirAlumno} className="space-y-2 border-t pt-4">
              <label className="block text-[10px] font-bold text-gray-400 uppercase">3. Matricular Alumno en este Curso</label>
              <select
                value={alumnoParaInscribir}
                onChange={(e) => setAlumnoParaInscribir(e.target.value)}
                disabled={!cursoSeleccionado}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40 disabled:opacity-50"
              >
                <option value="">-- Seleccione Estudiante --</option>
                {alumnos.map(a => (
                  <option key={a.id} value={a.id}>{a.apellidos}, {a.nombres}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={!cursoSeleccionado || !alumnoParaInscribir}
                className="w-full py-2 bg-emerald-600 text-white text-xs font-bold uppercase rounded-xl hover:bg-emerald-700 disabled:opacity-50"
              >
                ➕ Agregar Alumno a Lista
              </button>
            </form>

            {/* NOTIFICADOR */}
            {mensaje.texto && (
              <div className={`p-2.5 rounded-xl text-xs font-semibold ${
                mensaje.tipo === 'exito' ? 'bg-green-50 text-green-700' : mensaje.tipo === 'info' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'
              }`}>
                {mensaje.texto}
              </div>
            )}
          </div>

          {/* LISTA DE ALUMNOS PERTENECIENTES A LA SECCIÓN */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 border-b pb-2">
              👥 Estudiantes en esta Sección ({alumnosInscritos.length})
            </h3>

            {!cursoSeleccionado ? (
              <p className="text-xs text-center py-12 text-gray-400 font-medium">
                Seleccione un curso en el panel izquierdo para auditar la lista de alumnos clase.
              </p>
            ) : alumnosInscritos.length === 0 ? (
              <p className="text-xs text-center py-12 text-gray-400 font-medium">
                No hay alumnos registrados en esta sección todavía.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase bg-gray-50/50">
                      <th className="py-2 px-3">N°</th>
                      <th className="py-2 px-3">Apellidos y Nombres</th>
                      <th className="py-2 px-3">ID Relacional Inscripción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs text-gray-700">
                    {alumnosInscritos.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-gray-400">{index + 1}</td>
                        <td className="py-2.5 px-3 font-semibold text-gray-800">
                          {item.perfiles_alumnos?.apellidos}, {item.perfiles_alumnos?.nombres}
                        </td>
                        <td className="py-2.5 px-3 text-gray-400 font-mono text-[10px]">
                          {item.id}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default AsignacionSecciones;