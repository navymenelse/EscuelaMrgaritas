// src/features/pizarron/PizarronForm.jsx
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient'; // Asegúrate de ajustar la ruta

const PizarronForm = ({ rolUsuario }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [visibilidad, setVisibilidad] = useState('todos');
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Solo la administración o personas autorizadas pueden ver el formulario en su panel
  if (rolUsuario !== 'administracion') return null;

  const handlePublicar = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !contenido.trim()) return;

    try {
      setEnviando(true);
      setMensaje({ texto: '', tipo: '' });

      // NOTA TEMPORAL PARA TESIS: Como no hay Login aún, necesitamos un id de autor válido.
      // Supabase requiere que este id exista en la tabla 'usuarios' si creamos la clave foránea.
      // Para probar sin restricciones estrictas ahora mismo, puedes buscar un ID válido en tu tabla u ocultar temporalmente la FK.
      // Aquí asumiremos que insertamos los campos requeridos.
      
      // PASO METODOLÓGICO: Buscaremos primero el primer usuario disponible para usar su ID temporalmente.
      const { data: userQuery } = await supabase.from('usuarios').select('id').limit(1);
      
      if (!userQuery || userQuery.length === 0) {
        throw new Error("Para publicar, primero debes registrar al menos un usuario en la tabla 'usuarios' desde el panel de Supabase.");
      }

      const autorIdTemporal = userQuery[0].id;

      // Inserción en la tabla de la base de datos
      const { error } = await supabase
        .from('pizarron_anuncios')
        .insert([
          {
            autor_id: autorIdTemporal,
            titulo: titulo.trim(),
            contenido: contenido.trim(),
            visibilidad: visibilidad
          }
        ]);

      if (error) throw error;

      // Éxito: Limpiamos campos y notificamos al operador
      setTitulo('');
      setContenido('');
      setVisibilidad('todos');
      setMensaje({ texto: '¡Anuncio publicado con éxito en la cartelera digital!', tipo: 'exito' });
      
      // Una pequeña ayuda técnica: Forzar recarga ligera o si tienes un manejador de estado global
      // Para efectos de prueba instantánea, un aviso para refrescar o automatizar el trigger.
      if (window.location) {
        setTimeout(() => window.location.reload(), 1500);
      }

    } catch (err) {
      console.error('Error al publicar:', err.message);
      setMensaje({ texto: err.message || 'Ocurrió un error al guardar en la base de datos.', tipo: 'error' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-fit">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
        📝 Redactar Nuevo Comunicado
      </h3>

      <form onSubmit={handlePublicar} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Título del Anuncio</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Suspensión de actividades por mantenimiento técnico"
            className="w-full px-3 py-2 text-xs border border-gray-100 rounded-xl focus:outline-none focus:border-brand-primary bg-gray-50/50"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Cuerpo del Mensaje</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Escriba detalladamente el anuncio oficial aquí..."
            rows="4"
            className="w-full px-3 py-2 text-xs border border-gray-100 rounded-xl focus:outline-none focus:border-brand-primary bg-gray-50/50 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">¿Quiénes deben ver esto?</label>
          <select
            value={visibilidad}
            onChange={(e) => setVisibilidad(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-100 rounded-xl focus:outline-none focus:border-brand-primary bg-gray-50/50 font-medium"
          >
            <option value="todos">🌍 Toda la Institución (Todos)</option>
            <option value="profesores">👨‍🏫 Solo Personal Instructor</option>
            <option value="alumnos">🎒 Solo Comunidad de Alumnos</option>
          </select>
        </div>

        {mensaje.texto && (
          <div className={`p-3 rounded-xl text-xs font-semibold ${
            mensaje.tipo === 'exito' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {mensaje.texto}
          </div>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full py-2.5 bg-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:bg-gray-200 disabled:text-gray-400"
        >
          {enviando ? 'Guardando en la Nube...' : '🚀 Publicar en Cartelera'}
        </button>
      </form>
    </div>
  );
};

export default PizarronForm;