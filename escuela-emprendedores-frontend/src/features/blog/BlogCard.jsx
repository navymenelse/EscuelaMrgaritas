// src/features/blog/BlogCard.jsx
const BlogCard = ({ article }) => {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group">
      <div className="h-48 bg-brand-neutral flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
        {article.image}
      </div>
      <div className="p-6">
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-green-50 px-2 py-1 rounded">
          {article.category}
        </span>
        <h3 className="text-xl font-bold text-gray-800 mt-3 mb-2 group-hover:text-brand-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-400">{article.date}</span>
          <button className="text-brand-primary font-bold text-sm">Leer más →</button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;