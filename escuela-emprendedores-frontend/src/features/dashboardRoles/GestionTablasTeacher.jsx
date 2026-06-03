// src/features/dashboard-roles/GestionTablasTeacher.jsx
import React from 'react';
import { mockMisSecciones, mockMisAlumnos, mockMiHorario } from './TeacherData';

const GestionTablasTeacher = ({ activeTab }) => {
  const thStyle = "px-3 py-2 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200";
  const tdStyle = "px-3 py-2 text-xs text-gray-700 border-b border-gray-100 whitespace-nowrap";

  return (
    <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden my-2 border-t-4 border-t-brand-secondary">
      <div className="p-4 overflow-x-auto">
        
        {/* TABLA: MIS SECCIONES ASIGNADAS */}
        {activeTab === 'secciones' && (
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
              {mockMisSecciones.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/80">
                  <td className={`${tdStyle} font-mono font-bold text-brand-secondary`}>{s.id}</td>
                  <td className={`${tdStyle} font-semibold text-gray-900`}>{s.curso}</td>
                  <td className={tdStyle}>📍 {s.salon}</td>
                  <td className={tdStyle}>{s.horario}</td>
                  <td className={tdStyle}>
                    <span className="bg-orange-50 text-brand-secondary font-bold px-2 py-0.5 rounded text-[11px]">
                      {s.matricula} Alumnos
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* TABLA: LISTADO DE ALUMNOS Y CALIFICACIONES */}
        {activeTab === 'alumnos' && (
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
              {mockMisAlumnos.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/80">
                  <td className={`${tdStyle} font-semibold text-gray-500`}>{a.cedula}</td>
                  <td className={`${tdStyle} font-bold text-gray-800`}>{a.nombre}</td>
                  <td className={tdStyle}>{a.curso}</td>
                  <td className={`${tdStyle} text-center font-medium`}>{a.evaluacion1} pts</td>
                  <td className={`${tdStyle} text-center font-medium`}>{a.evaluacion2} pts</td>
                  <td className={`${tdStyle} text-center`}>
                    <span className={`font-bold px-2 py-0.5 rounded ${
                      Number(a.final) >= 10 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {a.final} pts
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* TABLA: CRONOGRAMA SEMANAL DE HORARIOS */}
        {activeTab === 'horario' && (
          <table className="w-full min-w-[650px] animate-fade-in">
            <thead>
              <tr>
                <th className={thStyle}>Día</th>
                <th className={thStyle}>Bloque de Horas</th>
                <th className={thStyle}>Actividad Académica</th>
                <th className={thStyle}>Curso Relacionado</th>
              </tr>
            </thead>
            <tbody>
              {mockMiHorario.map((h, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80">
                  <td className={`${tdStyle} font-bold text-brand-secondary uppercase text-[11px]`}>{h.dia}</td>
                  <td className={`${tdStyle} font-mono text-gray-600`}>⏰ {h.bloque}</td>
                  <td className={tdStyle}>{h.actividad}</td>
                  <td className={`${tdStyle} font-medium text-gray-900`}>{h.curso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};

export default GestionTablasTeacher;