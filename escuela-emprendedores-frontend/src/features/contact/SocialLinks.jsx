// src/features/contact/SocialLinks.jsx
import React from 'react';

const SocialLinks = () => {
  const socials = [
    { name: 'Instagram', icon: '📸', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600', label: '@EscuelaEmprendedores' },
    { name: 'WhatsApp', icon: '💬', color: 'bg-green-500', label: 'Consultas Directas' },
    { name: 'Facebook', icon: '👥', color: 'bg-blue-600', label: 'Comunidad de Egresados' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Nuestras Redes</h3>
      {socials.map((social) => (
        <a 
          key={social.name} 
          href="#" 
          className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all group"
        >
          <div className={`${social.color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-sm group-hover:scale-110 transition-transform`}>
            {social.icon}
          </div>
          <div>
            <p className="font-bold text-gray-800">{social.name}</p>
            <p className="text-xs text-gray-500">{social.label}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;