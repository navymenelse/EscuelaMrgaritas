// src/components/common/MainLayout.jsx
import Navbar from './Navbar';
import Footer from './Footer'; // Se asume su creación bajo el mismo concepto KISS

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
       <footer className="bg-gray-800 text-white py-6 text-center text-sm"> 
        <p>© {new Date().getFullYear()} Escuela de Artes y Oficios - Transformando el futuro.</p>
      </footer> 
    </div>
  );
};

export default MainLayout;