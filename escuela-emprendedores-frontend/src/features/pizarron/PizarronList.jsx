// src/features/pizarron/PizarronList.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient'; // Asegúrate de que la ruta apunte a tu archivo de conexión

const PizarronList = ({ rolUsuario }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los anuncios desde Supabase
  const obtenerAnuncios = async () => {
    try {
      setCargando(true);
     setError(null);
      
      const hoy = new Date().toISOString().split('T')[0]; // Obtiene la fecha de hoy en formato YYYY-MM-DD

      let query = supabase
        .from('pizarron_anuncios')
        .select('*')
        .eq('estado', 'publicado')            // REGLA: Solo los que ya estén aprobados/publicados
        .gte('fecha_expiracion', hoy)        // REGLA: Que la fecha de expiración sea Mayor o Igual a hoy
        .order('fecha_publicacion', { ascending: false }); // Los más nuevos primero

      // Filtro de visibilidad según el rol que está mirando la cartelera
      /*
      if (rolUsuario === 'profesores') {
        query = query.in('visibilidad', ['todos', 'profesores']);
      } else if (rolUsuario === 'alumno') {
        query = query.in('visibilidad', ['todos', 'alumnos']);
      }
        */
      // Si es administración, ve todos los anuncios, por lo que no se aplica filtro.

      const { data, error: supabaseError } = await query;

      if (supabaseError) throw supabaseError;
    
      setAnuncios(data);
    } catch (err) {
      console.error('Error al cargar la cartelera:', err.message);
      setError('No se pudieron cargar los anuncios importantes.');
    } finally {
      setCargando(false);
    }
  };

  // Ejecutar la consulta al montar el componente o al cambiar de rol
  useEffect(() => {
    obtenerAnuncios();
  }, [rolUsuario]);

  if (cargando) {
    return <p className="text-xs text-gray-400 italic animate-pulse p-4">Cargando anuncios oficiales...</p>;
  }

  if (error) {
    return <div className="text-xs text-red-500 bg-red-50 p-3 rounded-xl">{error}</div>;
  }

  return (
    <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
      {anuncios.length === 0 ? (
        <p className="text-xs text-gray-400 italic p-4 bg-gray-50 rounded-xl text-center">
          No hay comunicados publicados para este panel en este momento.
        </p>
      ) : (
        anuncios.map((anuncio) => (
          <div 
            key={anuncio.id} 
            className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all animate-fade-in relative overflow-hidden"
          >
            {/* Etiqueta sutil de visibilidad */}
            <span className="absolute top-3 right-3 text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-500">
              👁️ {anuncio.visibilidad}
            </span>

            <h4 className="text-sm font-bold text-gray-900 mb-1 pr-12">{anuncio.titulo}</h4>
            <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line mb-3">
              {anuncio.contenido}
            </p>
            
            <div className="flex justify-between items-center pt-2 border-t border-gray-50 text-[10px] text-gray-400 font-medium">
              <span>📢 Emitido por la Institución</span>
              <span>{new Date(anuncio.fecha_publicacion).toLocaleDateString('es-VE')}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PizarronList;