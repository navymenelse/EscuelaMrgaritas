// src/features/about/About.jsx
import History from './History';
import MissionVision from './MissionVision';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <History />
      <MissionVision />

      {/* Sección Equipo Docente */}
      <section className="py-12 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Equipo Docente Calificado</h3>
        <div className="bg-brand-neutral rounded-2xl p-8 border border-dashed border-gray-300">
          <p className="text-gray-500 italic">
            Contamos con instructores especialistas en cada área, con años de experiencia 
            en el sector productivo y pedagógico, comprometidos con el éxito de cada estudiante.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;