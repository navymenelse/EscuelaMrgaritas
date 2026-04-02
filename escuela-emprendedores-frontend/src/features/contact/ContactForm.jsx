// src/features/contact/ContactForm.jsx
const ContactForm = () => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-brand-primary mb-2">¿Tienes dudas?</h3>
      <p className="text-gray-500 text-sm mb-8">Déjanos tu mensaje y nuestro equipo de Control de Estudios te contactará.</p>
      
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Nombre completo" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none text-sm"
          />
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none text-sm"
          />
        </div>
        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none text-sm bg-white">
          <option>Interesado en...</option>
          <option>Corte y Costura</option>
          <option>Repostería</option>
          <option>Secretariado</option>
          <option>Otros cursos</option>
        </select>
        <textarea 
          placeholder="Tu mensaje o inquietud" 
          rows="4" 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none text-sm"
        ></textarea>
        <button className="w-full bg-brand-secondary text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

export default ContactForm;