// src/features/admin/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Escucha si el estado cambió desde el componente Login que está en el Navbar
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAdminAuthenticated') === 'true';
      setIsAdmin(authStatus);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    // Evento personalizado para cambios en la misma pestaña
    window.addEventListener('adminAuthChanged', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('adminAuthChanged', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    setIsAdmin(false);
    window.dispatchEvent(new Event('adminAuthChanged'));
  };

  return (
    <div className="min-h-[60vh] py-4">
      {isAdmin ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Acceso Restringido</h2>
          <p className="text-gray-500 max-w-sm mx-auto text-sm">
            Para ver este panel, por favor despliegue la opción <strong>"Administración"</strong> en la barra de navegación superior e inicie sesión.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminPage;