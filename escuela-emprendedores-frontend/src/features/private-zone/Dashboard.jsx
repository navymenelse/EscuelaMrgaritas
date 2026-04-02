// src/features/private-zone/Dashboard.jsx
const Dashboard = () => {
  const resources = [
    { title: "Guía de Patronaje Básico", type: "PDF", date: "15/03/2026" },
    { title: "Manual de Higiene y Seguridad", type: "Digital", date: "10/03/2026" }
  ];

  return (
    <div className="space-y-8">
      <header className="bg-brand-neutral p-6 rounded-2xl border border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Bienvenido, Estudiante</h2>
          <p className="text-sm text-brand-primary font-medium italic">Curso: Corte y Costura</p>
        </div>
        <div className="text-right">
          <span className="text-xs bg-brand-accent text-white px-3 py-1 rounded-full uppercase font-bold">Activo</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sección de Recursos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            📚 Recursos Educativos
          </h3>
          <div className="space-y-3">
            {resources.map((res, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-700">{res.title}</p>
                  <p className="text-[10px] text-gray-400">{res.date}</p>
                </div>
                <span className="text-xs text-brand-primary font-bold">{res.type} ↓</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gestión Administrativa */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            📄 Trámites y Certificados
          </h3>
          <div className="space-y-4">
            <button className="w-full py-2 border-2 border-dashed border-brand-secondary text-brand-secondary rounded-xl text-sm font-bold hover:bg-orange-50">
              Solicitar Constancia de Estudio
            </button>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-xs text-blue-800 font-medium">Próxima Inscripción:</p>
              <p className="text-sm font-bold text-brand-primary">Ciclo Julio - Diciembre 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;