// src/features/pizarron/PizarronForm.jsx
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient'; // Asegúrate de ajustar la ruta

const PizarronForm = ({ rolUsuario }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [visibilidad, setVisibilidad] = useState('todos');
  const [permanencia, setPermanencia] = useState('30'); // Estado nuevo: Días de vigencia por defecto (30 días)
  const [estadoPublicacion, setEstadoPublicacion] = useState('publicado'); // Estado nuevo: 'publicado' o 'borrador'
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

      // 1. OBTENCIÓN DEL AUTOR REAL: Recuperamos la cédula de la sesión activa del Login
      const cedulaAutor = sessionStorage.getItem('activeUser');
      
      // Buscamos el ID real de este usuario en Supabase mediante su cédula
      const { data: usuarioReal, error: userError } = await supabase
        .from('usuarios')
        .select('id')
        .eq('cedula', cedulaAutor)
        .maybeSingle();

      if (userError) throw userError;

      // Si por alguna razón de prueba local no se encuentra la sesión, buscamos un respaldo rápido
      let autorIdDefinitivo = usuarioReal?.id;
      if (!autorIdDefinitivo) {
        const { data: respaldo } = await supabase.from('usuarios').select('id').limit(1);
        if (respaldo && respaldo.length > 0) autorIdDefinitivo = respaldo[0].id;
      }

      if (!autorIdDefinitivo) {
        throw new Error("No se detectó un autor válido. Verifique los registros en la tabla 'usuarios'.");
      }

      // 2. CÁLCULO METODOLÓGICO DE LA FECHA DE EXPIRACIÓN
      const hoy = new Date();
      // Le sumamos los días seleccionados en el formulario (7, 30 o 180)
      hoy.setDate(hoy.getDate() + parseInt(permanencia, 10));
      const fechaExpiracionCalculada = hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD

      // 3. INSERCIÓN COMPLETA EN LA BASE DE DATOS
      const { error } = await supabase
        .from('pizarron_anuncios')
        .insert([
          {
            autor_id: autorIdDefinitivo,
            titulo: titulo.trim(),
            contenido: contenido.trim(),
            visibilidad: visibilidad,
            estado: estadoPublicacion,             // 'publicado' o 'borrador'
            fecha_expiracion: fechaExpiracionCalculada // Fecha límite calculada dinámicamente
          }
        ]);

      if (error) throw error;

      // Éxito: Limpiamos campos y notificamos al operador institucional
      setTitulo('');
      setContenido('');
      setVisibilidad('todos');
      setPermanencia('30');
      setEstadoPublicacion('publicado');
      
      const textoExito = estadoPublicacion === 'publicado' 
        ? '¡Anuncio publicado con éxito en la cartelera digital!' 
        : '¡Borrador guardado con éxito! No será visible en los paneles hasta ser publicado.';
        
      setMensaje({ texto: textoExito, tipo: 'exito' });
      
      // Recarga ligera para sincronizar la lista inferior de anuncios de inmediato
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
            rows="3"
            className="w-full px-3 py-2 text-xs border border-gray-100 rounded-xl focus:outline-none focus:border-brand-primary bg-gray-50/50 resize-none"
            required
          />
        </div>

        {/* CONTENEDOR GRID PARA ORGANIZAR SELECTORES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">¿Quiénes ven esto?</label>
            <select
              value={visibilidad}
              onChange={(e) => setVisibilidad(e.target.value)}
              className="w-full px-2 py-2 text-xs border border-gray-100 rounded-xl focus:outline-none focus:border-brand-primary bg-gray-50/50 font-medium"
            >
              <option value="todos">🌍 Toda la Inst.</option>
              <option value="profesores">👨‍🏫 Instructores</option>
              <option value="alumnos">🎒 Alumnos</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Permanencia</label>
            <select
              value={permanencia}
              onChange={(e) => setPermanencia(e.target.value)}
              className="w-full px-2 py-2 text-xs border border-gray-100 rounded-xl focus:outline-none focus:border-brand-primary bg-gray-50/50 font-medium"
            >
              <option value="7">⚡ Corta (7 Días)</option>
              <option value="30">📅 Estándar (30 Días)</option>
              <option value="180">🏫 Ciclo Escolar (6 Meses)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Estado Inicial</label>
            <select
              value={estadoPublicacion}
              onChange={(e) => setEstadoPublicacion(e.target.value)}
              className="w-full px-2 py-2 text-xs border border-gray-100 rounded-xl focus:outline-none focus:border-brand-primary bg-gray-50/50 font-medium"
            >
              <option value="publicado">🚀 Publicar ya</option>
              <option value="borrador">📁 Borrador</option>
            </select>
          </div>
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
          {enviando ? 'Guardando en la Nube...' : estadoPublicacion === 'publicado' ? '🚀 Publicar en Cartelera' : '📁 Guardar Borrador'}
        </button>
      </form>
    </div>
  );
};

export default PizarronForm;