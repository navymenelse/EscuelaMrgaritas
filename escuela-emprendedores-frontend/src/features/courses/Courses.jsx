// src/features/courses/Courses.jsx
import { courses } from './coursesData';
import CourseCard from './CourseCard';

const Courses = () => {
  return (
    <section className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Nuestra Oferta Educativa
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Programas diseñados para que aprendas haciendo y logres tu independencia económica a través de la producción artesanal y técnica.
        </p>
        <div className="h-1.5 w-24 bg-brand-secondary mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <div className="mt-16 bg-brand-primary rounded-3xl p-8 md:p-12 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h3>
        <p className="mb-8 opacity-90">Las inscripciones están abiertas para el próximo ciclo escolar.</p>
        <button className="bg-white text-brand-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
          Solicitar información de inscripción
        </button>
      </div>
    </section>
  );
};

export default Courses;