// src/features/contact/Contact.jsx
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';

const Contact = () => {
  return (
    <section className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Información y Redes */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Ponte en Contacto</h2>
            <p className="text-gray-600">Estamos ubicados en el corazón de Falcón, listos para impulsarte a producir.</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-xl">📍</span>
              <p className="text-sm">Av. Principal, Edif. Escuela de Artes y Oficios, Falcón.</p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-xl">📞</span>
              <p className="text-sm">+58 (268) 000-0000</p>
            </div>
          </div>

          <SocialLinks />
        </div>

        {/* Formulario */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;