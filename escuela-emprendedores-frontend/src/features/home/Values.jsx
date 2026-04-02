// src/features/home/Values.jsx
const Values = () => {
  const valuesList = [
    { title: 'Participación', desc: 'Involucramos activamente a nuestra comunidad.', icon: '🤝' },
    { title: 'Corresponsabilidad', desc: 'Compromiso mutuo entre institución y alumno.', icon: '⚖️' },
    { title: 'Ética al Trabajo', desc: 'Formamos profesionales con valores íntegros.', icon: '⭐' }
  ];

  return (
    <section className="py-16 bg-brand-neutral rounded-3xl my-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Nuestros Valores</h2>
        <div className="h-1 w-20 bg-brand-secondary mx-auto mt-2"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {valuesList.map((val) => (
          <div key={val.title} className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{val.icon}</div>
            <h3 className="text-xl font-bold text-brand-primary mb-2">{val.title}</h3>
            <p className="text-gray-600">{val.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;