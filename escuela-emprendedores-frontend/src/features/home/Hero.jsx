// src/features/home/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-white py-12 md:py-20 border-b border-gray-100">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary leading-tight">
            Aprender haciendo, <br />
            <span className="text-brand-secondary">enseñar producción.</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Desde 1964, formamos a los emprendedores de Falcón en artes y oficios, 
            impulsando el tejido productivo regional con ética y excelencia.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/courses" className="bg-brand-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-lg">
              Ver Cursos
            </a>
            <a href="/about" className="border-2 border-brand-primary text-brand-primary px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all">
              Nuestra Historia
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          {/* Espacio para imagen institucional o ilustración de estudiantes */}
          <div className="bg-gray-200 rounded-2xl h-64 md:h-96 flex items-center justify-center overflow-hidden shadow-inner">
             <span className="text-gray-400 italic text-sm text-center px-4">
               [Imagen sugerida: Estudiantes de la escuela en sus talleres de formación]
             </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;