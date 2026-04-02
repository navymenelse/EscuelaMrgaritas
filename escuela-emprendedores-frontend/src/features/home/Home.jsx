// src/features/home/Home.jsx
import Hero from './Hero';
import Values from './Values';

const Home = () => {
  return (
    <div className="space-y-12">
      <Hero />
      
      {/* Accesos rápidos (Calendario y Noticias) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border-l-4 border-brand-accent shadow-sm">
          <h4 className="font-bold text-lg mb-2 flex items-center">
            📅 Calendario Académico
          </h4>
            <p className="text-sm text-gray-500">Consulta las próximas fechas de inscripción y eventos.</p>
          <button className="mt-3 text-brand-accent font-semibold hover:underline">Ver detalles →</button>
        </div>
        <div className="bg-white p-6 rounded-xl border-l-4 border-brand-secondary shadow-sm">
          <h4 className="font-bold text-lg mb-2 flex items-center">
            📢 Noticias Recientes
          </h4>
          <p className="text-sm text-gray-500">Mantente al día con los logros de nuestros egresados.</p>
          <button className="mt-3 text-brand-secondary font-semibold hover:underline">Leer noticias →</button>
        </div>
      </div>

      <Values />
    </div>
  );
};

export default Home;