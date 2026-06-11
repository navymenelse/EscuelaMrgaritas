// src/features/dashboardRoles/TablaProfesores.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import ConfiguradorHorario from '../../components/common/ConfiguradorHorario';

const TablaProfesores = () => {
  const [profesores, setProfesores] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Campos del Formulario
  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correoPersonal, setCorreoPersonal] = useState('');
  const [correoInstitucional, setCorreoInstitucional] = useState('');
  const [estado, setEstado] = useState('activo');

  // Horarios
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [horaInicio, setHoraInicio] = useState('08:00');
  const [horaFin, setHoraFin] = useState('12:00');

  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [guardando, setGuardando] = useState(false);

  const cargarProfesores = async () => {
    try {
      setCargando(true);
      // Hacemos un JOIN directo usando la relación usuario_id hacia la tabla usuarios
      const { data, error } = await supabase
        .from('perfiles_profesores')
        .select(`
          id, nombres, apellidos, telefono, correo, disponibilidad_horaria, estado, usuario_id,
          usuarios ( cedula, correo )
        `);

      if (error) throw error;
      setProfesores(data || []);
    } catch (err) {
      console.error("Error cargando nómina:", err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProfesores();
  }, []);

  const handleToggleDia = (diaId) => {
    if (diasSeleccionados.includes(diaId)) {
      setDiasSeleccionados(diasSeleccionados.filter(d => d !== diaId));
    } else {
      setDiasSeleccionados([...diasSeleccionados, diaId]);
    }
  };

  const handleGuardarProfesor = async (e) => {
    e.preventDefault();
    if (!cedula.trim() || !nombres.trim() || !apellidos.trim() || !correoInstitucional.trim()) {
      setMensaje({ texto: 'Por favor, complete los datos obligatorios.', tipo: 'error' });
      return;
    }

    const disponibilidadFormateada = diasSeleccionados.length > 0 
      ? `${diasSeleccionados.join(', ')} de ${horaInicio} a ${horaFin}`
      : 'No definida';

    try {
      setGuardando(true);
      setMensaje({ texto: 'Registrando credenciales de acceso...', tipo: 'info' });

      // PASO 1: Insertar en la tabla 'usuarios' para el Login institucional
      const { data: nuevoUsuario, error: errorUser } = await supabase
        .from('usuarios')
        .insert([
          {
            cedula: cedula.trim(),
            correo: correoInstitucional.trim(),
            password_hash: cedula.trim(), // Contraseña temporal = Cédula
            rol: 'profesor'
          }
        ])
        .select();

      if (errorUser) throw new Error(`Error en Tabla Usuarios: ${errorUser.message}`);
      
      const usuarioIdAsignado = nuevoUsuario[0]?.id;

   // PASO 2: Insertar en 'perfiles_profesores' saciando todas las restricciones NOT NULL del esquema
      const { error: errorPerfil } = await supabase
        .from('perfiles_profesores')
        .insert([
          {
            usuario_id: usuarioIdAsignado,
            nombres: nombres.trim(),
            apellidos: apellidos.trim(),
            telefono: telefono.trim(),
            correo: correoPersonal.trim(),
            disponibilidad_horaria: disponibilidadFormateada,
            estado: estado,
            
            // 👈 Solución a las columnas obligatorias detectadas en tu esquema visual
            titulo_academico: 'Por definir', 
            fecha_nacimiento: '1980-01-01', // Fecha genérica provisional
            fecha_ingreso: new Date().toISOString().split('T')[0] // Registra automáticamente el día de hoy (YYYY-MM-DD)
          }
        ]);

      if (errorPerfil) throw new Error(`Error en Perfil Profesor: ${errorPerfil.message}`);

      setMensaje({ texto: '✨ Instructor e inicio de sesión creados exitosamente.', tipo: 'exito' });
      
      // Limpiar Formulario
      setCedula('');
      setNombres('');
      setApellidos('');
      setTelefono('');
      setCorreoPersonal('');
      setCorreoInstitucional('');
      setDiasSeleccionados([]);
      
      cargarProfesores();
    } catch (err) {
      console.error("Fallo transaccional:", err.message);
      setMensaje({ texto: err.message, tipo: 'error' });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="space-y-6 bg-gray-50/50 p-2 min-h-screen">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Nómina del Personal Docente</h2>
        <p className="text-xs text-gray-500">Alta de cuentas de acceso institucional y expedientes de contacto.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* FORMULARIO */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-fit space-y-4">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-b pb-2">
            <span>👨‍🏫 Incorporar Instructor</span>
          </h3>

          <form onSubmit={handleGuardarProfesor} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Cédula (Login)</label>
                <input
                  type="text"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder="V-12345678"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Estado</label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40 font-medium text-gray-700"
                >
                  <option value="activo">🟢 Activo</option>
                  <option value="suspendido">🔴 Suspendido</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Nombres</label>
                <input
                  type="text"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  placeholder="Juan Carlos"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Apellidos</label>
                <input
                  type="text"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  placeholder="Pérez"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Correo Institucional (Acceso al Portal)</label>
              <input
                type="email"
                value={correoInstitucional}
                onChange={(e) => setCorreoInstitucional(e.target.value)}
                placeholder="j.perez@escuelamargaritas.com"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40 font-semibold text-blue-700"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Teléfono Móvil</label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="0412-5555555"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Correo Personal</label>
                <input
                  type="email"
                  value={correoPersonal}
                  onChange={(e) => setCorreoPersonal(e.target.value)}
                  placeholder="juanperez@gmail.com"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-400 uppercase">Bloque de Permanencia / Guardia</label>
              <ConfiguradorHorario
                diasSeleccionados={diasSeleccionados}
                onToggleDia={handleToggleDia}
                horaInicio={horaInicio}
                onHoraInicioChange={setHoraInicio}
                horaFin={horaFin}
                onHoraFinChange={setHoraFin}
              />
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
              className="w-full py-2.5 bg-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-blue-600 transition-colors disabled:bg-gray-200"
            >
              {guardando ? 'Generando Cuentas...' : '💼 Dar de Alta Profesor'}
            </button>
          </form>
        </div>

        {/* LISTADO */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 border-b pb-2">
            📋 Profesores Registrados ({profesores.length})
          </h3>

          {cargando ? (
            <p className="text-xs text-center py-10 text-gray-400 font-medium">Sincronizando expedientes...</p>
          ) : profesores.length === 0 ? (
            <p className="text-xs text-center py-10 text-gray-400 font-medium">No hay instructores en la nómina.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase bg-gray-50/50">
                    <th className="py-2.5 px-2">Instructor / Login</th>
                    <th className="py-2.5 px-2">Contacto</th>
                    <th className="py-2.5 px-2">Horario Asignado</th>
                    <th className="py-2.5 px-2 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs text-gray-700">
                  {profesores.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-2">
                        <p className="font-bold text-gray-800">{item.apellidos}, {item.nombres}</p>
                        <p className="text-[10px] text-gray-505 font-medium">C.I: {item.usuarios?.cedula || 'N/A'}</p>
                        <p className="text-[9px] text-blue-600 font-mono font-semibold">{item.usuarios?.correo || 'Sin cuenta'}</p>
                      </td>
                      <td className="py-3 px-2">
                        <p className="font-medium text-gray-600">{item.telefono || 'Sin tlf'}</p>
                        <p className="text-[10px] text-gray-400">{item.correo || 'Sin correo personal'}</p>
                      </td>
                      <td className="py-3 px-2 text-[11px] font-medium text-gray-500">
                        <span className="bg-blue-50/50 text-blue-700 px-2 py-1 rounded-lg border border-blue-100/40">
                          {item.disponibilidad_horaria}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          item.estado === 'activo' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
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
  );
};

export default TablaProfesores;