-- 1. EXTENSIONES (Útil para generar identificadores únicos universales automáticamente)
create extension if not exists "uuid-ossp";

-- 2. TABLA: usuarios (Conexión principal para el Login)
create table usuarios (
    id uuid default uuid_generate_v4() primary key,
    cedula varchar(20) unique not null,
    correo varchar(100) unique not null,
    password_hash text not null, -- Supabase maneja auth, pero si deseas tu tabla personalizada aquí guardas el hash
    rol varchar(20) check (rol in ('administracion', 'profesor', 'alumno')) not null,
    fecha_creacion timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. TABLA: perfiles_profesores
create table perfiles_profesores (
    id uuid default uuid_generate_v4() primary key,
    usuario_id uuid references usuarios(id) on delete cascade unique not null,
    nombres varchar(100) not null,
    apellidos varchar(100) not null,
    titulo_academico varchar(150) not null,
    fecha_nacimiento date not null,
    fecha_ingreso date not null
);

-- 4. TABLA: perfiles_alumnos
create table perfiles_alumnos (
    id uuid default uuid_generate_v4() primary key,
    usuario_id uuid references usuarios(id) on delete cascade unique not null,
    nombres varchar(100) not null,
    apellidos varchar(100) not null,
    ultimo_titulo varchar(150) not null,
    fecha_nacimiento date not null,
    condicion varchar(20) check (condicion in ('activo', 'cesante', 'egresado')) default 'activo' not null
);

-- 5. TABLA: cursos
create table cursos (
    id uuid default uuid_generate_v4() primary key,
    nombre varchar(150) not null,
    profesor_id uuid references perfiles_profesores(id) on delete set null,
    periodo varchar(50) not null,
    fecha_inicio date not null,
    horario varchar(100) not null,
    salon varchar(50) not null
);

-- 6. TABLA INTERMEDIA: inscripciones_y_notas (Relación Muchos a Muchos con Notas)
create table inscripciones_y_notas (
    id uuid default uuid_generate_v4() primary key,
    alumno_id uuid references perfiles_alumnos(id) on delete cascade not null,
    curso_id uuid references cursos(id) on delete cascade not null,
    fecha_inscripcion date default current_date not null,
    nota_corte1 numeric(4,2) default 0.00 check (nota_corte1 >= 0 and nota_corte1 <= 20),
    nota_corte2 numeric(4,2) default 0.00 check (nota_corte2 >= 0 and nota_corte2 <= 20),
    nota_final numeric(4,2) default 0.00 check (nota_final >= 0 and nota_final <= 20),
    unique(alumno_id, curso_id) -- Impide que un alumno se inscriba dos veces en el mismo curso
);

-- 7. TABLA: pizarron_anuncios
create table pizarron_anuncios (
    id uuid default uuid_generate_v4() primary key,
    autor_id uuid references usuarios(id) on delete cascade not null,
    titulo varchar(200) not null,
    contenido text not null,
    visibilidad varchar(20) check (visibilidad in ('todos', 'profesores', 'alumnos')) default 'todos' not null,
    fecha_publicacion timestamp with time zone default timezone('utc'::text, now()) not null
);