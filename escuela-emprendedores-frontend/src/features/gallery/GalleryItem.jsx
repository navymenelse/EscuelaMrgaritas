// src/features/gallery/GalleryItem.jsx
import React from 'react';

const GalleryItem = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden bg-brand-neutral flex items-center justify-center">
        {item.type === "image" ? (
          <img 
            src={item.src} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <video 
            src={item.src} 
            controls 
            className="w-full h-full object-cover"
          />
        )}
        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-white bg-black/50 px-2 py-1 rounded">
          {item.category}
        </span>
        {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <span className="text-white text-5xl">▶️</span>
            </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-brand-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mt-2">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default GalleryItem;