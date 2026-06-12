// src/features/dashboardRoles/TablaAlumnos.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const TablaAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados del Formulario
  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correoPersonal, setCorreoPersonal] = useState('');
  const [correoInstitucional, setCorreoInstitucional] = useState('');
  const [estado, setEstado] = useState('activo');

  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [guardando, setGuardando] = useState(false);

  const cargarAlumnos = async () => {
    try {
      setCargando(true);
      // JOIN relacional desde el perfil del alumno hacia su usuario base
      const { data, error } = await supabase
        .from('perfiles_alumnos')
        .select(`
          id, nombres, apellidos, telefono, correo, estado, usuario_id,
          usuarios ( cedula, correo )
        `);

      if (error) throw error;
 setAlumnos(data || []);
    } catch (err) {
      console.error("Error cargando alumnos:", err.message);
    } finally { // 👈 Reemplaza aquí "bits" por "finally"
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarAlumnos();
  }, []);

  const handleGuardarAlumno = async (e) => {
    e.preventDefault();
    if (!cedula.trim() || !nombres.trim() || !apellidos.trim() || !correoInstitucional.trim()) {
      setMensaje({ texto: 'Por favor, complete los campos obligatorios (*).', tipo: 'error' });
      return;
    }

    try {
      setGuardando(true);
      setMensaje({ texto: 'Generando credenciales de estudiante...', tipo: 'info' });

      // PASO 1: Registrar en la central de 'usuarios' para permitir su login futuro
      const { data: nuevoUsuario, error: errorUser } = await supabase
        .from('usuarios')
        .insert([
          {
            cedula: cedula.trim(),
            correo: correoInstitucional.trim(),
            password_hash: cedula.trim(), // Contraseña provisional = Cédula
            rol: 'alumno' // Seteamos explícitamente el rol de estudiante
          }
        ])
        .select();

      if (errorUser) throw new Error(`Error en Tabla Usuarios: ${errorUser.message}`);
      
      const usuarioIdAsignado = nuevoUsuario[0]?.id;

      // PASO 2: Insertar en 'perfiles_alumnos' vinculando el usuario_id
      const { error: errorPerfil } = await supabase
        .from('perfiles_alumnos')
        .insert([
          {
            usuario_id: usuarioIdAsignado,
            nombres: nombres.trim(),
            apellidos: apellidos.trim(),
            telefono: telefono.trim(),
            correo: correoPersonal.trim(), // Correo de contacto
            estado: estado
          }
        ]);

      if (errorPerfil) throw new Error(`Error en Perfil Alumno: ${errorPerfil.message}`);

      setMensaje({ texto: '✨ Alumno matriculado e inscrito correctamente.', tipo: 'exito' });
      
      // Limpiar campos
      setCedula('');
      setNombres('');
      setApellidos('');
      setTelefono('');
      setCorreoPersonal('');
      setCorreoInstitucional('');
      
      cargarAlumnos();
    } catch (err) {
      console.error("Fallo en alta de alumno:", err.message);
      setMensaje({ texto: err.message, tipo: 'error' });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="space-y-6 bg-gray-50/50 p-2 min-h-screen">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Matrícula de Alumnos</h2>
        <p className="text-xs text-gray-500">Registro de nuevos estudiantes, asignación de correos institucionales y control de expedientes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* FORMULARIO DE MATRÍCULA */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-fit space-y-4">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-b pb-2">
            <span>🎓 Matricular Estudiante</span>
          </h3>

          <form onSubmit={handleGuardarAlumno} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Cédula *</label>
                <input
                  type="text"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder="V-22222222"
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
                  <option value="inactivo">⚪ Inactivo</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Nombres *</label>
                <input
                  type="text"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  placeholder="María Alejandra"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Apellidos *</label>
                <input
                  type="text"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  placeholder="Gómez"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Correo Institucional * (Usuario Portal)</label>
              <input
                type="email"
                value={correoInstitucional}
                onChange={(e) => setCorreoInstitucional(e.target.value)}
                placeholder="m.gomez@escuelamargaritas.com"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40 font-semibold text-emerald-700"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Teléfono</label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="0414-7777777"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Correo Personal</label>
                <input
                  type="email"
                  value={correoPersonal}
                  onChange={(e) => setCorreoPersonal(e.target.value)}
                  placeholder="marigomez@gmail.com"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-brand-primary bg-gray-50/40"
                />
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
              className="w-full py-2.5 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-emerald-700 transition-colors disabled:bg-gray-200 shadow-sm"
            >
              {guardando ? 'Procesando Matrícula...' : '🎓 Matricular Alumno'}
            </button>
          </form>
        </div>

        {/* LISTADO DE ALUMNOS MATRICULADOS */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 border-b pb-2">
            📋 Estudiantes Registrados ({alumnos.length})
          </h3>

          {cargando ? (
            <p className="text-xs text-center py-10 text-gray-400 font-medium">Sincronizando matrícula...</p>
          ) : alumnos.length === 0 ? (
            <p className="text-xs text-center py-10 text-gray-400 font-medium">No hay alumnos matriculados en la institución.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase bg-gray-50/50">
                    <th className="py-2.5 px-2">Estudiante / Cédula</th>
                    <th className="py-2.5 px-2">Contacto</th>
                    <th className="py-2.5 px-2">Cuenta Institucional</th>
                    <th className="py-2.5 px-2 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs text-gray-700">
                  {alumnos.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-2">
                        <p className="font-bold text-gray-800">{item.apellidos}, {item.nombres}</p>
                        <p className="text-[10px] text-gray-400 font-medium">C.I: {item.usuarios?.cedula || 'N/A'}</p>
                      </td>
                      <td className="py-3 px-2">
                        <p className="font-medium text-gray-600">{item.telefono || 'Sin tlf'}</p>
                        <p className="text-[10px] text-gray-400">{item.correo || 'Sin correo personal'}</p>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-xs text-emerald-700 font-mono font-semibold bg-emerald-50/60 px-2 py-1 rounded-lg border border-emerald-100/40">
                          {item.usuarios?.correo || 'Sin usuario'}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          item.estado === 'activo' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
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

export default TablaAlumnos;