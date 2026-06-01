// src/features/pizarron/pizarronData.js

export const mockAnuncios = [
  {
    id: 1,
    remitente: "Dirección de Administración",
    rolRemitente: "administracion",
    alcance: "general", // Lo ven Todos: Admin, Profesores y Alumnos
    titulo: "Mantenimiento Planificado de Infraestructura",
    contenido: "El próximo sábado no habrá acceso a los talleres por labores de mantenimiento eléctrico en el sistema central.",
    fecha: "01/06/2026",
    materiaId: null
  },
  {
    id: 2,
    remitente: "Control de Estudios",
    rolRemitente: "administracion",
    alcance: "profesores", // Sólo lo ven los Profesores
    titulo: "Cierre de Carga de Notas - Primer Corte",
    contenido: "Estimados instructores, recuerden que el sistema bloqueará la carga de evaluaciones este viernes a las 11:59 PM.",
    fecha: "01/06/2026",
    materiaId: null
  },
  {
    id: 3,
    remitente: "Prof. María (Corte y Costura)",
    rolRemitente: "profesor",
    alcance: "materia", // Filtrado por materia específica
    titulo: "Materiales para la clase de Patronaje",
    contenido: "Alumnos, para la sesión del miércoles favor traer papel bond, escuadras de sastre y cinta métrica sin falta.",
    fecha: "01/06/2026",
    materiaId: "corte-costura" // Un identificador para cruzar con el alumno
  }
];

/* ======================================================================
  💡 COMENTARIOS PARA EL BACKEND (SUPABASE / POSTGRESQL):
  ======================================================================
  Cuando migremos esto a la base de datos, crearemos una tabla 'anuncios':
  
  CREATE TABLE anuncios (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id), -- Quién escribe
    rol_remitente VARCHAR(50),               -- administracion | profesor
    alcance VARCHAR(50) NOT NULL,            -- general | profesores | materia
    titulo VARCHAR(150) NOT NULL,
    contenido TEXT NOT NULL,
    materia_id VARCHAR(50) NULL,             -- FK a la tabla materias si alcance = 'materia'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  Para las consultas (Queries) usaremos filtros RLS (Row Level Security):
  - Vista Alumno: SELECT * FROM anuncios WHERE alcance = 'general' OR materia_id = 'su-materia';
  - Vista Profesor: SELECT * FROM anuncios WHERE alcance IN ('general', 'profesores') OR user_id = auth.uid();
*/