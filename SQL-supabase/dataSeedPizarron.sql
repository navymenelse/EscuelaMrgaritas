-- 1. Modificar la tabla existente para añadir las nuevas reglas de negocio de tu tesis
alter table pizarron_anuncios 
add column estado varchar(20) check (estado in ('borrador', 'publicado', 'archivado')) default 'publicado',
add column fecha_expiracion date default (current_date + interval '30 days'); -- Por defecto duran 30 días

-- 2. Limpiar la tabla por completo para asegurar una siembra limpia
truncate table pizarron_anuncios cascade;

-- 3. Volver a sembrar los 5 anuncios con fechas vigentes y estados explícitos
insert into pizarron_anuncios (autor_id, titulo, contenido, visibilidad, estado, fecha_expiracion)
values
  -- Anuncio 1: Público General - Publicado y Vigente
  (
    'a1111111-1111-1111-1111-111111111111',
    'Convocatoria: Inicio del Período Académico 2026',
    'Se le informa a toda la comunidad institucional que las actividades correspondientes al nuevo ciclo socioproductivo iniciarán formalmente el próximo lunes.',
    'todos', 'publicado', '2026-12-31'
  ),

  -- Anuncio 2: Solo Profesores - Publicado y Vigente
  (
    'a1111111-1111-1111-1111-111111111111',
    'Entrega de Planificaciones Pedagógicas',
    'Estimados instructores, se les recuerda que tienen oportunidad hasta este viernes de consignar en coordinación los planes de evaluación.',
    'profesores', 'publicado', '2026-07-15'
  ),

  -- Anuncio 3: Solo Alumnos - Publicado y Vigente
  (
    'a1111111-1111-1111-1111-111111111111',
    'Proceso de Solicitud de Becas y Ayudas',
    'Atención estudiantes inscritos: Se encuentra abierto el censo para la asignación de herramientas y materiales de apoyo para los talleres.',
    'alumnos', 'publicado', '2026-08-30'
  ),

  -- Anuncio 4: Público General - EN BORRADOR (No debe verse en el portal del alumno aún)
  (
    'b2222222-2222-2222-2222-222222222222',
    '[BORRADOR] Ajuste de horarios por contingencia eléctrica',
    'Texto en desarrollo sobre la reprogramación de bloques horarios para los talleres de los sábados...',
    'todos', 'borrador', '2026-06-30'
  ),

  -- Anuncio 5: Solo Alumnos - ARCHIVADO / EXPIRADO (Mensaje viejo de Mayo que ya no debe mostrarse)
  (
    'b2222222-2222-2222-2222-222222222222',
    'Simulacro de Evacuación y Primeros Auxilios',
    'Este evento finalizó el mes pasado. Cumplimos con éxito los protocolos institucionales de seguridad escolar.',
    'alumnos', 'archivado', '2026-05-15'
  );