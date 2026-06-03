// src/features/dashboard-roles/GestionTablasStudent.jsx
import React from 'react';
import { mockMisNotas, mockMiHorarioEstudiante, mockMiInscripcion } from './StudentData';

const GestionTablasStudent = ({ activeTab }) => {
  const thStyle = "px-3 py-2 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200";
  const tdStyle = "px-3 py-2 text-xs text-gray-700 border-b border-gray-100 whitespace-nowrap";

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden my-2 border-t-4 border-t-emerald-600">
      <div className="p-4 overflow-x-auto">
        
        {/* TABLA: CALIFICACIONES Y RENDIMIENTO */}
        {activeTab === 'notas' && (
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
              {mockMisNotas.map((n) => (
                <tr key={n.id} className="hover:bg-gray-50/80">
                  <td className={`${tdStyle} font-bold text-gray-900`}>{n.asignatura}</td>
                  <td className={tdStyle}>👨‍🏫 {n.profesor}</td>
                  <td className={`${tdStyle} text-center`}>{n.corte1} pts</td>
                  <td className={`${tdStyle} text-center`}>{n.corte2} pts</td>
                  <td className={`${tdStyle} text-center font-bold text-emerald-600 bg-emerald-50/30`}>{n.final} pts</td>
                  <td className={tdStyle}>
                    <span className="bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                      {n.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* TABLA: MI CRONOGRAMA DE CLASES */}
        {activeTab === 'horario' && (
          <table className="w-full min-w-[600px] animate-fade-in">
            <thead>
              <tr>
                <th className={thStyle}>Día</th>
                <th className={thStyle}>Horario</th>
                <th className={thStyle}>Asignatura / Taller</th>
                <th className={thStyle}>Ambiente Asignado</th>
              </tr>
            </thead>
            <tbody>
              {mockMiHorarioEstudiante.map((h, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80">
                  <td className={`${tdStyle} font-bold text-emerald-700 uppercase text-[11px]`}>{h.dia}</td>
                  <td className={`${tdStyle} font-mono text-gray-600`}>⏰ {h.hora}</td>
                  <td className={`${tdStyle} font-semibold text-gray-800`}>{h.asignatura}</td>
                  <td className={tdStyle}>📍 {h.ambiente}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* TABLA: EXPEDIENTE DE MATRÍCULA */}
        {activeTab === 'expediente' && (
          <table className="w-full min-w-[650px] animate-fade-in">
            <thead>
              <tr>
                <th className={thStyle}>Período Escolar</th>
                <th className={thStyle}>Fecha de Registro</th>
                <th className={thStyle}>Modalidad</th>
                <th className={thStyle}>Condición Actual</th>
                <th className={thStyle}>Estatus de Certificación</th>
              </tr>
            </thead>
            <tbody>
              {mockMiInscripcion.map((i, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80">
                  <td className={`${tdStyle} font-bold text-gray-900`}>{i.periodo}</td>
                  <td className={tdStyle}>{i.fechaInscripcion}</td>
                  <td className={tdStyle}>📋 {i.modalidad}</td>
                  <td className={tdStyle}>
                    <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                      {i.condicion}
                    </span>
                  </td>
                  <td className={`${tdStyle} text-xs font-medium text-gray-400 italic`}>
                    {i.certificadoPendiente}
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

export default GestionTablasStudent;