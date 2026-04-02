// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/common/MainLayout'
import Home from './features/home/Home';
import Courses from './features/courses/Courses';
import About from './features/about/About';
import PrivateZone from './features/private-zone/PrivateZone';
import Blog from './features/blog/Blog';
import Contact from './features/contact/Contact';
import Gallery from './features/gallery/Gallery';

// Nota: A medida que creemos los demás archivos, los importaremos aquí
// import About from './features/about/About';
// import Courses from './features/courses/Courses';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Ruta Principal: Página de Inicio */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<PrivateZone />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />

          {/* Rutas Futuras (se irán activando conforme desarrollemos los archivos) */}
          {/* <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          */}

          {/* Ruta de 404 - Página no encontrada (Opcional) */}
          <Route path="*" element={
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-800">404 - Página no encontrada</h2>
              <p className="text-gray-600 mt-2">Lo sentimos, la sección que buscas no existe.</p>
              <a href="/" className="text-brand-primary mt-4 inline-block font-bold">Volver al Inicio</a>
            </div>
          } />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;