// src/features/about/History.jsx
import React from 'react';

const History = () => {
  return (
    <section className="py-12 bg-white">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-brand-secondary/20 rounded-full blur-2xl"></div>
            <h2 className="text-3xl font-bold text-brand-primary mb-6 relative">
              Nuestra Historia <br />
              <span className="text-gray-400 text-lg font-medium">Desde 1964</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nacimos con el firme propósito de brindar herramientas técnicas a la clase trabajadora. 
              A lo largo de más de seis décadas, hemos evolucionado de un pequeño taller de artes 
              a una institución de referencia regional en la formación de artes y oficios.
            </p>
            <p className="text-gray-600 leading-relaxed font-semibold italic border-l-4 border-brand-secondary pl-4">
              "Formar para la vida, producir para la patria".
            </p>
          </div>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="bg-brand-neutral h-40 rounded-2xl flex items-center justify-center text-gray-400 italic text-xs p-4 text-center">
            [Foto de archivo: Primera sede 1964]
          </div>
          <div className="bg-brand-neutral h-40 mt-8 rounded-2xl flex items-center justify-center text-gray-400 italic text-xs p-4 text-center">
            [Foto: Talleres actuales]
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;