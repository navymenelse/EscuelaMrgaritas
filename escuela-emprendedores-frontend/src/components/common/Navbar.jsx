// src/components/common/Navbar.jsx
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre Nosotros', path: '/about' },
    { name: 'Cursos', path: '/courses' },
    { name: 'Galería', path: '/gallery' },
    { name: 'Noticias', path: '/blog' },
    { name: 'Contacto', path: '/contact'}
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Nombre de la Institución */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-brand-primary font-bold text-xl uppercase tracking-wider">
              Escuela de Emprendedores
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a key={item.name} href={item.path} className="text-gray-700 hover:text-brand-primary transition-colors font-medium">
                {item.name}
              </a>
            ))}
            <a href="/login" className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
              Zona Privada
            </a>
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
          <a href="/login" className="block px-4 py-3 text-base font-bold text-brand-primary">
            Zona Privada
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;