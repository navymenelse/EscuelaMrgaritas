// src/features/admin/CursosAdmin.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import ConfiguradorHorario from '../../components/common/ConfiguradorHorario';

const CursosAdmin = () => {
  const [cursos, setCursos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [mostrarNuevaEsp, setMostrarNuevaEsp] = useState(false);
  const [nombreNuevaEsp, setNombreNuevaEsp] = useState('');

  const [nombre, setNombre] = useState('');
  const [especialidadId, setEspecialidadId] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [salon, setSalon] = useState('');
  const [estado, setEstado] = useState('activo');

  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [horaInicio, setHoraInicio] = useState('08:00');
  const [horaFin, setHoraFin] = useState('12:00');

  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [guardando, setGuardando] = useState(false);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      
      // 1. Cargar especialidades
      const { data: dataEsp, error: errEsp } = await supabase
        .from('especialidades')
        .select('*');
      
      if (errEsp) console.error("Error cargando especialidades:", errEsp.message);
      setEspecialidades(dataEsp || []);

      // 2. Cargar cursos de forma plana (Evitamos fallos por nombres de relación)
      const { data: dataCur, error: errCur } = await supabase
        .from('cursos')
        .select('*');
      
      if (errCur) console.error("Error cargando cursos:", errCur.message);
      setCursos(dataCur || []);

    } catch (error) {
      console.error('Error general de sincronización:', error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleToggleDia = (diaId) => {
    if (diasSeleccionados.includes(diaId)) {
      setDiasSeleccionados(diasSeleccionados.filter(d => d !== diaId));
    } else {
      setDiasSeleccionados([...diasSeleccionados, diaId]);
    }
  };

  // Crear especialidad blindada
  const handleCrearEspecialidad = async (e) => {
    e.preventDefault();
    if (!nombreNuevaEsp.trim()) return;

    try {
      setMensaje({ texto: 'Procesando especialidad...', tipo: 'info' });
      
      const { data, error } = await supabase
        .from('especialidades')
        .insert([{ nombre: nombreNuevaEsp.trim() }])
        .select();

      if (error) throw error;

      setMensaje({ texto: '✨ Especialidad añadida correctamente.', tipo: 'exito' });
      setNombreNuevaEsp('');
      setMostrarNuevaEsp(false);
      
      // Forzar recarga inmediata de la lista
      const { data: refrescoEsp } = await supabase.from('especialidades').select('*');
      setEspecialidades(refrescoEsp || []);
      
      if (data && data[0]) {
        setEspecialidadId(data[0].id);
      }
    } catch (err) {
      console.error("Error en inserción:", err.message);
      setMensaje({ texto: `Error: ${err.message}`, tipo: 'error' });
    }
  };

  const handleGuardarCurso = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !especialidadId || diasSeleccionados.length === 0) {
      setMensaje({ texto: 'Por favor, complete todos los campos y horarios.', tipo: 'error' });
      return;
    }

    const horarioFormateado = `${diasSeleccionados.join(', ')} de ${horaInicio} a ${horaFin}`;

    try {
      setGuardando(true);
      setMensaje({ texto: '', tipo: '' });

      const payload = {
        nombre: nombre.trim(),
        especialidad_id: especialidadId,
        periodo: periodo.trim(),
        fecha_inicio: fechaInicio,
        horario: horarioFormateado,
        salon: salon.trim(),
        estado: estado
      };

      const { error } = await supabase
        .from('cursos')
        .insert([payload]);

      if (error) throw error;

      setMensaje({ texto: '¡Curso publicado exitosamente!', tipo: 'exito' });
      
      setNombre('');
      setPeriodo('');
      setFechaInicio('');
      setSalon('');
      setDiasSeleccionados([]);
      setEspecialidadId('');
      
      cargarDatos();
    } catch (err) {
      console.error("Error guardando curso:", err.message);
      setMensaje({ texto: err.message, tipo: 'error' });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50/50 min-h-screen">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Control de Oferta Académica</h2>
        <p className="text-xs text-gray-500">Planificación estructural y publicación automatizada del catálogo de formación.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* FORMULARIO */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-fit space-y-4">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-b pb-2">
            <span>🏫 Aperturar Nuevo Curso</span>
          </h3>

          <form onSubmit={handleGuardarCurso} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Nombre del Curso</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Repostería Avanzada"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Especialidad / Área de Estudio</label>
              <div className="flex gap-2">
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
                <button
                  type="button"
                  onClick={() => setMostrarNuevaEsp(!mostrarNuevaEsp)}
                  className="px-3 bg-brand-primary text-white font-bold rounded-xl text-sm hover:bg-blue-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {mostrarNuevaEsp && (
              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 space-y-2">
                <label className="block text-[9px] font-bold text-blue-700 uppercase">Nueva Especialidad de Emprendimiento</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nombreNuevaEsp}
                    onChange={(e) => setNombreNuevaEsp(e.target.value)}
                    placeholder="Ej: Costura Industrial"
                    className="w-full px-3 py-1.5 text-xs border border-blue-200 rounded-lg bg-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCrearEspecialidad}
                    className="px-3 py-1.5 bg-green-600 text-white font-bold rounded-lg text-xs uppercase"
                  >
                    Crear
                  </button>
                </div>
              </div>
            )}

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

            <ConfiguradorHorario
              diasSeleccionados={diasSeleccionados}
              onToggleDia={handleToggleDia}
              horaInicio={horaInicio}
              onHoraInicioChange={setHoraInicio}
              horaFin={horaFin}
              onHoraFinChange={setHoraFin}
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Aula / Taller</label>
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
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Estado Inicial</label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40 font-medium"
                >
                  <option value="activo">🟢 Activo</option>
                  <option value="planificacion">🟡 Planificación</option>
                </select>
              </div>
            </div>

            {mensaje.texto && (
              <div className={`p-2.5 rounded-xl text-xs font-semibold ${
                mensaje.tipo === 'exito' ? 'bg-green-50 text-green-700' : mensaje.tipo === 'info' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'
              }`}>
                {mensaje.texto}
              </div>
            )}

            <button
              type="submit"
              disabled={guardando}
              className="w-full py-2.5 bg-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-blue-600 transition-colors shadow-sm disabled:bg-gray-200"
            >
              {guardando ? 'Publicando...' : '💼 Registrar y Publicar'}
            </button>
          </form>
        </div>

        {/* TABLA */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 border-b pb-2">
              📋 Cursos Publicados ({cursos.length})
            </h3>

            {cargando ? (
              <p className="text-xs text-center py-10 text-gray-400 font-medium">Sincronizando con la institución...</p>
            ) : cursos.length === 0 ? (
              <p className="text-xs text-center py-10 text-gray-400 font-medium">No hay cursos registrados en el sistema aún.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase bg-gray-50/50">
                      <th className="py-2.5 px-2">Curso</th>
                      <th className="py-2.5 px-2">Período</th>
                      <th className="py-2.5 px-2">Horario Configurado</th>
                      <th className="py-2.5 px-2">Ambiente</th>
                      <th className="py-2.5 px-2 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs text-gray-700">
                    {cursos.map((item) => {
                      // Buscar el nombre de la especialidad localmente de manera segura
                      const espRelacionada = especialidades.find(e => e.id === item.especialidad_id);
                      return (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 px-2">
                            <p className="font-bold text-gray-800">{item.nombre}</p>
                            <p className="text-[10px] text-gray-400 font-medium">{espRelacionada ? espRelacionada.nombre : 'General'}</p>
                          </td>
                          <td className="py-3 px-2 font-medium text-gray-500">{item.periodo}</td>
                          <td className="py-3 px-2 text-[11px] font-medium text-gray-600">{item.horario}</td>
                          <td className="py-3 px-2 font-medium"><span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{item.salon}</span></td>
                          <td className="py-3 px-2 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                              item.estado === 'activo' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                            }`}>
                              {item.estado}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
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