// src/features/gallery/Gallery.jsx
import { mediaItems } from './galleryData';
import GalleryItem from './GalleryItem';

const Gallery = () => {
  return (
    <section className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Nuestra Huella Visual
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Un repositorio de imágenes y videos que documentan las instalaciones, eventos socioproductivos y, fundamentalmente, los logros de nuestros estudiantes y emprendedores.
        </p>
        <div className="h-1.5 w-24 bg-brand-secondary mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mediaItems.map(item => (
          <GalleryItem key={item.id} item={item} />
        ))}
      </div>
       <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 border border-dashed border-gray-300 text-center">
        <h3 className="text-xl font-bold text-brand-primary mb-2">¡Muestra tu Talento!</h3>
        <p className="text-gray-600 mb-6 text-sm">Si eres egresado y quieres compartir tus logros, contáctanos para incluirte en nuestra galería.</p>
        <button className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors">
          Enviar mi Proyecto
        </button>
      </div>
    </section>
  );
};

export default Gallery;