// src/features/courses/CourseCard.jsx
const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="text-4xl mb-4">{course.icon}</div>
      <h3 className="text-xl font-bold text-brand-primary mb-2">
        {course.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">
        {course.description}
      </p>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        <span className="text-xs font-semibold text-brand-accent bg-green-50 px-2 py-1 rounded-full">
          ⏱ {course.duration}
        </span>
        <button className="text-brand-secondary font-bold text-sm hover:underline">
          Ver requisitos →
        </button>
      </div>
    </div>
  );
};

export default CourseCard;