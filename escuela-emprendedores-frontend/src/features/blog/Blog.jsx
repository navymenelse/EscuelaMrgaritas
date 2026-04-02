// src/features/blog/Blog.jsx
import { articles } from './blogData';
import BlogCard from './BlogCard';

const Blog = () => {
  return (
    <section className="py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Noticias y Actualidad
          </h2>
          <p className="text-gray-500 mt-2">
            Historias de éxito, anuncios institucionales y novedades de nuestra comunidad.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-medium">Todas</button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Casos de Éxito</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <BlogCard key={article.id} article={article} />
        ))}
      </div>

      {/* Suscripción simplificada (KISS) */}
      <div className="mt-20 bg-brand-neutral rounded-3xl p-8 md:p-12 border border-gray-200 text-center">
        <h3 className="text-xl font-bold text-brand-primary mb-2">¿Quieres recibir nuestras novedades?</h3>
        <p className="text-gray-600 mb-6 text-sm">Déjanos tu correo para informarte sobre nuevos cursos y ferias.</p>
        <div className="max-w-md mx-auto flex gap-2">
          <input 
            type="email" 
            placeholder="tu@correo.com" 
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <button className="bg-brand-secondary text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors">
            Unirme
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;