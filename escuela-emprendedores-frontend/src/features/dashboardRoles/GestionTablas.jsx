// src/features/dashboard-roles/GestionTablas.jsx
import React, { useState } from 'react';
import { mockProfesores, mockAlumnos, mockPersonalAdmin, mockCursos, mockEgresados } from './AdminData';

const GestionTablas = () => {
  const [activeTab, setActiveTab] = useState('profesores');

  const tabs = [
    { id: 'profesores', label: 'Profesores', icon: '👨‍🏫' },
    { id: 'alumnos', label: 'Alumnos', icon: '🎒' },
    { id: 'admin', label: 'P. Administrativo', icon: '💼' },
    { id: 'cursos', label: 'Cursos', icon: '📚' },
    { id: 'egresados', label: 'Egresados', icon: '🎓' }
  ];

  // Estilo común para las celdas de las tablas (diseño compacto)
  const thStyle = "px-3 py-2 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200";
  const tdStyle = "px-3 py-2 text-xs text-gray-700 border-b border-gray-100 whitespace-nowrap";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6 animate-fade-in">
      {/* Menú de Pestañas Navegables */}
      <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-none bg-gray-50/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'border-brand-primary text-brand-primary bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenedor de las Tablas con Scroll Horizontal Responsivo */}
      <div className="p-4 overflow-x-auto">
        
        {/* TABLA: PROFESORES */}
        {activeTab === 'profesores' && (
          <table className="w-full min-w-[700px]">
            <thead>
              <tr>
                <th className={thStyle}>Cédula</th>
                <th className={thStyle}>Nombres y Apellidos</th>
                <th className={thStyle}>Título Académico</th>
                <th className={thStyle}>F. Nacimiento</th>
                <th className={thStyle}>F. Ingreso</th>
              </tr>
            </thead>
            <tbody>
              {mockProfesores.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/80">
                  <td className={`${tdStyle} font-semibold text-brand-primary`}>{p.cedula}</td>
                  <td className={tdStyle}>{p.nombre} {p.apellido}</td>
                  <td className={tdStyle}><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px]">{p.titulo}</span></td>
                  <td className={tdStyle}>{p.fechaNacimiento}</td>
                  <td className={tdStyle}>{p.fechaIngreso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* TABLA: ALUMNOS */}
        {activeTab === 'alumnos' && (
          <table className="w-full min-w-[750px]">
            <thead>
              <tr>
                <th className={thStyle}>Cédula</th>
                <th className={thStyle}>Nombres y Apellidos</th>
                <th className={thStyle}>Último Título</th>
                <th className={thStyle}>F. Nacimiento</th>
                <th className={thStyle}>F. Inscripción</th>
                <th className={thStyle}>Condición</th>
              </tr>
            </thead>
            <tbody>
              {mockAlumnos.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/80">
                  <td className={`${tdStyle} font-semibold text-brand-primary`}>{a.cedula}</td>
                  <td className={tdStyle}>{a.nombre} {a.apellido}</td>
                  <td className={tdStyle}>{a.titulo}</td>
                  <td className={tdStyle}>{a.fechaNacimiento}</td>
                  <td className={tdStyle}>{a.fechaInscripcion}</td>
                  <td className={tdStyle}>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      a.condicion === 'activo' ? 'bg-green-100 text-green-700' :
                      a.condicion === 'cesante' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {a.condicion}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* TABLA: PERSONAL ADMINISTRATIVO */}
        {activeTab === 'admin' && (
          <table className="w-full min-w-[800px]">
            <thead>
              <tr>
                <th className={thStyle}>Cédula</th>
                <th className={thStyle}>Nombres y Apellidos</th>
                <th className={thStyle}>Cargo</th>
                <th className={thStyle}>Título Académico</th>
                <th className={thStyle}>F. Nacimiento</th>
                <th className={thStyle}>F. Ingreso</th>
              </tr>
            </thead>
            <tbody>
              {mockPersonalAdmin.map((pa) => (
                <tr key={pa.id} className="hover:bg-gray-50/80">
                  <td className={`${tdStyle} font-semibold text-brand-primary`}>{pa.cedula}</td>
                  <td className={tdStyle}>{pa.nombre} {pa.apellido}</td>
                  <td className={`${tdStyle} font-bold text-gray-800`}>{pa.cargo}</td>
                  <td className={tdStyle}>{pa.titulo}</td>
                  <td className={tdStyle}>{pa.fechaNacimiento}</td>
                  <td className={tdStyle}>{pa.fechaIngreso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* TABLA: CURSOS */}
        {activeTab === 'cursos' && (
          <table className="w-full min-w-[850px]">
            <thead>
              <tr>
                <th className={thStyle}>Curso / Especialidad</th>
                <th className={thStyle}>Período Inscripción</th>
                <th className={thStyle}>Fecha Inicio</th>
                <th className={thStyle}>Horario Asignado</th>
                <th className={thStyle}>Instructor</th>
                <th className={thStyle}>Salón</th>
                <th className={thStyle}>Matrícula</th>
              </tr>
            </thead>
            <tbody>
              {mockCursos.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/80">
                  <td className={`${tdStyle} font-bold text-gray-900`}>{c.nombre}</td>
                  <td className={tdStyle}>{c.fechaInscripcion}</td>
                  <td className={tdStyle}>{c.fechaInicio}</td>
                  <td className={tdStyle}>{c.horario}</td>
                  <td className={tdStyle}>👨‍🏫 {c.profesor}</td>
                  <td className={tdStyle}>📍 {c.salon}</td>
                  <td className={tdStyle}>
                    <span className="bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded">
                      {c.alumnosContados} Alumnos
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* TABLA: EGRESADOS */}
        {activeTab === 'egresados' && (
          <table className="w-full min-w-[800px]">
            <thead>
              <tr>
                <th className={thStyle}>Cédula</th>
                <th className={thStyle}>Egresado</th>
                <th className={thStyle}>Curso Aprobado</th>
                <th className={thStyle}>F. Graduación</th>
                <th className={thStyle}>Código Certificado</th>
              </tr>
            </thead>
            <tbody>
              {mockEgresados.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50/80">
                  <td className={`${tdStyle} font-semibold text-brand-primary`}>{e.cedula}</td>
                  <td className={tdStyle}>{e.nombre} {e.apellido}</td>
                  <td className={tdStyle}>{e.curso}</td>
                  <td className={tdStyle}>{e.fechaGraduacion}</td>
                  <td className={`${tdStyle} font-mono text-xs text-amber-700 bg-amber-50/50 rounded font-bold`}>
                    📄 {e.certificadoId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};

export default GestionTablas;

/* ======================================================================
  💡 COMENTARIOS PARA EL POSTERIOR AJUSTE CON BACKEND:
  ======================================================================
  Cuando se conecte la base de datos, este componente cambiará los arreglos 
  estáticos por estados 'useState' y llamadas a la API de Supabase dentro de un 
  'useEffect' que se dispare al cambiar de pestaña:

  useEffect(() => {
    const fetchDatos = async () => {
      let { data, error } = await supabase.from(activeTab).select('*');
      if (!error) setDatosTabla(data);
    };
    fetchDatos();
  }, [activeTab]);
*/