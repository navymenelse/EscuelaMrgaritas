-- Crear la tabla contenedora para las áreas de emprendimiento
create table especialidades (
    id uuid default gen_random_uuid() primary key,
    nombre varchar(150) not null unique,                  -- Ej: 'Gastronomía', 'Confección', 'Computación'
    descripcion text,
    creado_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-----------------

-- Agregar la relación de especialidad a tu tabla de cursos existente
alter table cursos 
add column especialidad_id uuid references especialidades(id) on delete cascade;

-- (Opcional) Si quieres añadir un campo de estado para controlar si está activo o finalizado:
alter table cursos 
add column estado varchar(50) default 'activo';

-----------------

-- Activar la seguridad de fila (RLS)
alter table especialidades enable row level security;
alter table cursos enable row level security;

-- Políticas de Lectura (Cualquiera puede ver los cursos en la web)
create policy "Lectura pública de especialidades" on especialidades for select using (true);
create policy "Lectura pública de cursos" on cursos for select using (true);

-- Políticas de Escritura (El panel de administración puede insertar)
create policy "Gestión de especialidades para admin" on especialidades for insert with check (true);
create policy "Gestión de cursos para admin" on cursos for insert with check (true);

-------------------

-- PRIMERA SEMILLA

-- 1. Insertar Especialidades
insert into especialidades (nombre, descripcion) values
('Área de Gastronomía', 'Cursos orientados al emprendimiento culinario y panadero.'),
('Área de Textil y Confección', 'Cursos orientados al diseño, patronaje y costura.');

-- 2. Insertar Cursos utilizando tus columnas exactas
insert into cursos (nombre, periodo, fecha_inicio, horario, salon, especialidad_id) values
(
  'Panadería Artesanal', 
  'I-2026', 
  '2026-06-15', 
  'Lunes y Miércoles 1:00 PM a 4:30 PM', 
  'Taller de Cocina A',
  (select id from map_especialidades where nombre = 'Área de Gastronomía' limit 1)
),
(
  'Costura Industrial y Confección', 
  'I-2026', 
  '2026-06-16', 
  'Martes y Jueves 8:00 AM a 11:30 AM', 
  'Salón de Costura B',
  (select id from map_especialidades where nombre = 'Área de Textil y Confección' limit 1)
);