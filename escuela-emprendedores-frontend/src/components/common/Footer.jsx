// src/components/common/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          
          {/* Columna 1: Identidad */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg uppercase tracking-wider">
              Escuela de Emprendedores
            </h3>
            <p className="text-sm leading-relaxed">
              Formando artesanos y profesionales técnicos en el estado Falcón desde 1964. 
              Comprometidos con el desarrollo socioproductivo de nuestra región.
            </p>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-brand-secondary transition-colors">📱</a>
              <a href="#" className="hover:text-brand-secondary transition-colors">📸</a>
              <a href="#" className="hover:text-brand-secondary transition-colors">📧</a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos (Navegación Intuitiva) */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-white transition-colors">Nuestra Historia</a></li>
              <li><a href="/courses" className="hover:text-white transition-colors">Oferta Educativa</a></li>
              <li><a href="/gallery" className="hover:text-white transition-colors">Galería de Logros</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Zona Privada</a></li>
            </ul>
          </div>

          {/* Columna 3: Contacto Directo */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span> 
                Av. Principal, Edif. Escuela de Artes y Oficios, Falcón.
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span> 
                +58 (268) 000-0000
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span> 
                contacto@escuelaemprendedores.edu.ve
              </li>
            </ul>
          </div>

        </div>

        {/* Línea Divisoria y Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-xs">
          <p>
            © {currentYear} Escuela de Artes y Oficios. 
            <span className="block md:inline mt-1 md:mt-0 md:ml-2">
              "Aprender haciendo y enseñar producción".
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;