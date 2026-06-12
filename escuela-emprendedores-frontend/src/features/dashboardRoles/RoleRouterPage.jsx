// src/features/dashboard-roles/RoleRouterPage.jsx
import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import Contact from '../contact/Contact';

const RoleRouterPage = () => {
  // 💡 Añadimos userId al estado de la sesión
  const [session, setSession] = useState({ isAuthenticated: false, userType: '', userId: '' });

  useEffect(() => {
    const readSession = () => {
      const auth = sessionStorage.getItem('isUserAuthenticated') === 'true';
      const type = sessionStorage.getItem('usuarioTipo') || '';
      const uid = sessionStorage.getItem('usuarioId') || ''; // 👈 Recuperamos el ID de autenticación de Supabase
      
      setSession({ isAuthenticated: auth, userType: type, userId: uid });
    };

    readSession();
    window.addEventListener('authSessionChanged', readSession);
    return () => window.removeEventListener('authSessionChanged', readSession);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear(); // Limpieza absoluta de la pestaña
    window.dispatchEvent(new Event('authSessionChanged'));
    window.location.replace('/'); // Reemplazo limpio de ruta
  };

  if (!session.isAuthenticated) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto my-8">
        <span className="text-4xl">🔒</span>
        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Acceso Denegado</h2>
        <p className="text-gray-500 text-sm px-4">Por favor, use el botón de "Administración" superior e ingrese sus credenciales asignadas.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-4">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full text-gray-600">
          Sesión Activa: <strong className="text-brand-primary">{session.userType}</strong>
        </span>
        <button onClick={handleLogout} className="text-xs font-bold text-red-600 hover:underline">
          Cerrar Sesión institucional
        </button>
      </div>

      {/* 💡 Enviamos el userId correspondiente a cada Dashboard para amarrar las capas de ID */}
      {session.userType === 'administracion' && <AdminDashboard idUsuarioAuth={session.userId} />}
      {session.userType === 'profesor' && <TeacherDashboard idUsuarioAuth={session.userId} />}
      {session.userType === 'alumno' && <StudentDashboard idUsuarioAuth={session.userId} />}
    </div>
  );
};

export default RoleRouterPage;