// src/features/dashboard-roles/GestionTablas.jsx
import React from 'react';
import TablaProfesores from './TablaProfesores'; // Tus componentes de control existentes
import TablaAlumnos from './TablaAlumnos';
import TablaAdmin from './TablaAdmin';
import TablaEgresados from './TablaEgresados';
import CursosAdmin from '../admin/CursosAdmin'; // 👈 Inyección del nuevo panel de control de cursos

const GestionTablas = ({ activeTab }) => {
  
  // Conmutador dinámico basado en la tarjeta seleccionada por el administrador
  switch (activeTab) {
    case 'profesores':
      return <TablaProfesores />;
      
    case 'alumnos':
      return <TablaAlumnos />;
      
    case 'admin':
      return <TablaAdmin />;
      
    case 'cursos':
      return <CursosAdmin />; // 👈 Reemplaza la vista estática por el módulo real conectado a Supabase
      
    case 'egresados':
      return <TablaEgresados />;
      
    default:
      return null;
  }
};

export default GestionTablas;