// src/components/common/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [auth, setAuth] = useState({ active: false, type: '' });
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);

  const menuItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre Nosotros', path: '/about' },
    { name: 'Cursos', path: '/courses' },
    { name: 'Galería', path: '/gallery' },
    { name: 'Noticias', path: '/blog' },
    { name: 'Contacto', path: '/contact'}
  ];

  const mockCredentials = [
    { usuario: 'admin', clave: '123456', usuarioTipo: 'administracion' },
    { usuario: 'profe', clave: '654321', usuarioTipo: 'profesor' },
    { usuario: 'alumno', clave: 'abcde', usuarioTipo: 'alumno' }
  ];

  useEffect(() => {
    const checkAuth = () => {
      // Cambiado a sessionStorage para que expire al cerrar la pestaña
      const active = sessionStorage.getItem('isUserAuthenticated') === 'true';
      const type = sessionStorage.getItem('usuarioTipo') || '';
      setAuth({ active, type });
    };
    checkAuth();
    window.addEventListener('authSessionChanged', checkAuth);
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('authSessionChanged', checkAuth);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    const cleanUser = user.trim().toLowerCase();
    const cleanPassword = password.trim();

    const match = mockCredentials.find(
      c => c.usuario.toLowerCase() === cleanUser && String(c.clave) === cleanPassword
    );

    if (match) {
      // Guardado seguro en sessionStorage
      sessionStorage.setItem('isUserAuthenticated', 'true');
      sessionStorage.setItem('usuarioTipo', match.usuarioTipo);
      sessionStorage.setItem('activeUser', match.usuario);
      
      setError('');
      setUser('');
      setPassword('');
      setIsDropdownOpen(false);
      
      window.dispatchEvent(new Event('authSessionChanged'));
      
      // Redirección suave compatible con SPAs en producción
      window.location.replace('/portal'); 
    } else {
      setError('Credenciales no válidas.');
    }
  };

  // Función de Cierre de Sesión desde el Navbar
  const handleNavbarLogout = () => {
    sessionStorage.clear(); // Limpia todo el almacenamiento de la pestaña
    setAuth({ active: false, type: '' });
    setIsDropdownOpen(false);
    setIsOpen(false);
    window.dispatchEvent(new Event('authSessionChanged'));
    window.location.replace('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-brand-primary font-bold text-xl uppercase tracking-wider">
              Escuela de Emprendedores
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <a key={item.name} href={item.path} className="text-gray-700 hover:text-brand-primary transition-colors font-medium text-sm">
                {item.name}
              </a>
            ))}
            
            <a href="/login" className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all font-medium text-sm">
              Zona Privada
            </a>

            {/* BOTÓN DESPLEGABLE */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`text-sm font-semibold px-4 py-2 rounded-md transition-all flex items-center gap-1 ${
                  auth.active ? 'bg-green-600 text-white' : 'bg-brand-secondary text-white hover:bg-orange-600'
                }`}
              >
                💼 {auth.active ? `Portal: ${auth.type}` : 'Administración'} <span className="text-xs">▼</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-5 text-gray-800">
                  {!auth.active ? (
                    <form onSubmit={handleLoginSubmit} className="space-y-3">
                      <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-2 text-xs uppercase tracking-wider">
                        Acceso General de Personal
                      </h4>
                      {error && <p className="text-xs bg-red-50 text-red-600 p-2 rounded-lg font-medium">{error}</p>}
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-500 mb-1">Usuario</label>
                        <input 
                          type="text" 
                          value={user}
                          onChange={(e) => setUser(e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-primary" 
                          placeholder="admin, profe o alumno"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-500 mb-1">Contraseña</label>
                        <input 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-primary"
                          placeholder="Clave de prueba"
                          required
                        />
                      </div>
                      <button type="submit" className="w-full bg-brand-primary text-white py-2 rounded-lg font-bold text-sm hover:bg-blue-800 transition-colors">
                        Acceder al Sistema
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-3 text-center">
                      <p className="text-xs font-medium text-gray-600">Sesión activa como: <strong className="capitalize">{auth.type}</strong></p>
                      <a 
                        href="/portal" 
                        className="block w-full bg-brand-primary text-white py-2 rounded-lg font-bold text-sm text-center hover:bg-blue-800 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Ir a mi Panel Escolar
                      </a>
                      {/* SOLUCIÓN AL PROBLEMA: BOTÓN DE CIERRE DIRECTO EN EL NAVBAR */}
                      <button 
                        onClick={handleNavbarLogout}
                        className="w-full mt-2 bg-red-50 text-red-600 py-2 rounded-lg font-bold text-sm hover:bg-red-100 transition-colors"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16m-7 6h7" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-brand-neutral border-t border-gray-200">
          {menuItems.map((item) => (
            <a key={item.name} href={item.path} className="block px-4 py-3 text-base text-gray-700 border-b border-gray-100">
              {item.name}
            </a>
          ))}
          <a href="/login" className="block px-4 py-3 text-base font-bold text-brand-primary border-b border-gray-100">
            Zona Privada
          </a>
          {auth.active ? (
            <>
              <a href="/portal" className="block px-4 py-3 text-base font-bold text-brand-secondary border-b border-gray-100">
                Mi Panel ({auth.type})
              </a>
              <button 
                onClick={handleNavbarLogout}
                className="block w-full text-left px-4 py-3 text-base font-bold text-red-600 bg-red-50"
              >
                Cerrar Sesión Activa
              </button>
            </>
          ) : (
            <a href="/portal" className="block px-4 py-3 text-base font-bold text-brand-secondary">
              Mi Panel Institucional
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;