// src/features/admin/CursosAdmin.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const CursosAdmin = () => {
  // Estados para la lista de datos
  const [cursos, setCursos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados para el Formulario de Registro
  const [nombre, setNombre] = useState('');
  const [especialidadId, setEspecialidadId] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [horario, setHorario] = useState('');
  const [salon, setSalon] = useState('');
  const [estado, setEstado] = useState('activo');

  // Estados de notificación
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [guardando, setGuardando] = useState(false);

  // Cargar datos iniciales de Supabase
  const cargarDatos = async () => {
    try {
      setCargando(true);
      
      // 1. Traer especialidades para el selector del formulario
      const { data: dataEsp, error: errEsp } = await supabase
        .from('especialidades')
        .select('*')
        .order('nombre', { ascending: true });
      if (errEsp) throw errEsp;
      setEspecialidades(dataEsp);

      // 2. Traer cursos cruzando el nombre de su especialidad (Relación formal)
      const { data: dataCur, error: errCur } = await supabase
        .from('cursos')
        .select(`
          id, nombre, periodo, fecha_inicio, horario, salon, estado,
          especialidades ( nombre )
        `)
        .order('creado_at', { ascending: false });
      if (errCur) throw errCur;
      setCursos(dataCur);

    } catch (error) {
      console.error('Error al cargar datos en el panel:', error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Procesar el registro del nuevo curso
  const handleGuardarCurso = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !periodo.trim() || !especialidadId) return;

    try {
      setGuardando(true);
      setMensaje({ texto: '', tipo: '' });

      const { error } = await supabase
        .from('cursos')
        .insert([
          {
            nombre: nombre.trim(),
            especialidad_id: especialidadId,
            periodo: periodo.trim(),
            fecha_inicio: fechaInicio,
            horario: horario.trim(),
            salon: salon.trim(),
            estado: estado
          }
        ]);

      if (error) throw error;

      setMensaje({ texto: '¡Curso registrado y publicado exitosamente en la web pública!', tipo: 'exito' });
      
      // Limpiar Formulario
      setNombre('');
      setEspecialidadId('');
      setPeriodo('');
      setFechaInicio('');
      setHorario('');
      setSalon('');
      
      // Recargar la tabla inmediatamente sin reiniciar la página
      cargarDatos();

    } catch (err) {
      console.error('Error al insertar curso:', err.message);
      setMensaje({ texto: err.message || 'Error al guardar en la base de datos.', tipo: 'error' });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50/50 min-h-screen">
      {/* CABECERA */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">Control de Oferta Académica</h2>
        <p className="text-xs text-gray-500">Registra nuevos programas formativos para visualización y captación en la web principal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMNA 1: FORMULARIO DE REGISTRO INTUITIVO */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2 border-b pb-2">
            🏫 Aperturar Nuevo Curso
          </h3>

          <form onSubmit={handleGuardarCurso} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Nombre del Curso</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Repostería Básica Comercial"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Especialidad / Área</label>
              <select
                value={especialidadId}
                onChange={(e) => setEspecialidadId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40 font-medium text-gray-700"
                required
              >
                <option value="">Seleccione un área...</option>
                {especialidades.map((esp) => (
                  <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Período Académico</label>
                <input
                  type="text"
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  placeholder="Ej: I-2026"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Fecha de Inicio</label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Horario de Clases</label>
              <input
                type="text"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                placeholder="Ej: Martes y Jueves 1:00 PM a 4:30 PM"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Ambiente / Salón</label>
                <input
                  type="text"
                  value={salon}
                  onChange={(e) => setSalon(e.target.value)}
                  placeholder="Ej: Taller A"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Estado de Apertura</label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40 font-medium"
                >
                  <option value="activo">🟢 Activo / Oferta</option>
                  <option value="planificacion">🟡 En Planificación</option>
                  <option value="finalizado">🔴 Finalizado</option>
                </select>
              </div>
            </div>

            {mensaje.texto && (
              <div className={`p-3 rounded-xl text-xs font-semibold ${
                mensaje.tipo === 'exito' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {mensaje.texto}
              </div>
            )}

            <button
              type="submit"
              disabled={guardando}
              className="w-full py-2.5 bg-brand-secondary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-orange-600 transition-colors shadow-sm disabled:bg-gray-200"
            >
              {guardando ? 'Registrando...' : '💼 Lanzar Curso'}
            </button>
          </form>
        </div>

        {/* COLUMNA 2 Y 3: TABLA SCANNABLE DE CURSOS ACTUALES */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 border-b pb-2">
              📋 Control de Cursos Publicados ({cursos.length})
            </h3>

            {cargando ? (
              <p className="text-xs text-center py-10 text-gray-400 font-medium">Consultando base de datos en tiempo real...</p>
            ) : cursos.length === 0 ? (
              <p className="text-xs text-center py-10 text-gray-400 font-medium">No hay cursos registrados en el sistema aún.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase bg-gray-50/50">
                      <th className="py-2.5 px-2">Curso / Área</th>
                      <th className="py-2.5 px-2">Período</th>
                      <th className="py-2.5 px-2">Horario</th>
                      <th className="py-2.5 px-2">Salón</th>
                      <th className="py-2.5 px-2 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs text-gray-700">
                    {cursos.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 px-2">
                          <p className="font-bold text-gray-800">{item.nombre}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{item.especialidades?.nombre || 'Sin Área asignada'}</p>
                        </td>
                        <td className="py-3 px-2 font-medium text-gray-500">{item.periodo}</td>
                        <td className="py-3 px-2 text-[11px] max-w-[150px] truncate" title={item.horario}>{item.horario}</td>
                        <td className="py-3 px-2 font-medium"><span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{item.salon}</span></td>
                        <td className="py-3 px-2 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            item.estado === 'activo' ? 'bg-green-50 text-green-600' : 
                            item.estado === 'planificacion' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {item.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CursosAdmin;