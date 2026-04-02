// src/features/about/MissionVision.jsx
const MissionVision = () => {
  return (
    <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-brand-primary border-brand-primary p-10 rounded-3xl shadow-xl transform hover:-translate-y-1 transition-transform">
        <div className="text-3xl mb-4">🚀</div>
        <h3 className="text-2xl font-bold text-brand-primary mb-4">Misión</h3>
        <p className="text-gray-800 leading-relaxed">
          Formar ciudadanos integrales a través del aprendizaje técnico y artesanal, 
          fomentando el emprendimiento sostenible y la ética del trabajo para dinamizar 
          el tejido productivo local.
        </p>
      </div>
      
      <div className="bg-white border-2 border-brand-primary p-10 rounded-3xl shadow-sm transform hover:-translate-y-1 transition-transform">
        <div className="text-3xl mb-4">👁️</div>
        <h3 className="text-2xl font-bold text-brand-primary mb-4">Visión</h3>
        <p className="text-gray-600 leading-relaxed">
          Ser la institución líder en capacitación técnica del estado Falcón, reconocida 
          por su excelencia académica y por la capacidad de sus egresados para generar 
          soluciones innovadoras y productivas en la sociedad.
        </p>
      </div>
    </section>
  );
};

export default MissionVision;