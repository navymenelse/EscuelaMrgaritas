// src/features/dashboard-roles/adminData.js

export const mockProfesores = [
  { id: 1, nombre: "Carlos", apellido: "Mendoza", cedula: "V-12.345.678", titulo: "Ing. Mecánico", fechaNacimiento: "15/05/1980", fechaIngreso: "10/02/2015" },
  { id: 2, nombre: "María", apellido: "Gómez", cedula: "V-14.222.333", titulo: "Lic. en Educación", fechaNacimiento: "22/08/1985", fechaIngreso: "15/09/2018" }
];

export const mockAlumnos = [
  { id: 1, nombre: "Luis", apellido: "Rodríguez", cedula: "V-28.111.222", titulo: "Bachiller", fechaNacimiento: "04/12/2002", fechaInscripcion: "15/01/2025", condicion: "activo" },
  { id: 2, nombre: "Ana", apellido: "Martínez", cedula: "V-25.444.555", titulo: "T.S.U. Informática", fechaNacimiento: "30/07/1998", fechaInscripcion: "10/03/2024", condicion: "cesante" }
];

export const mockPersonalAdmin = [
  { id: 1, nombre: "Pedro", apellido: "Silva", cedula: "V-10.999.888", titulo: "Lic. Administración", fechaNacimiento: "11/11/1975", fechaIngreso: "01/03/2010", cargo: "Jefe de Control de Estudios" },
  { id: 2, nombre: "Elena", apellido: "Castro", cedula: "V-16.555.444", titulo: "T.S.U. Contabilidad", fechaNacimiento: "05/02/1988", fechaIngreso: "16/05/2021", cargo: "Asistente de Recursos Humanos" }
];

export const mockCursos = [
  { id: 1, nombre: "Corte y Costura Industrial", fechaInscripcion: "01/01/2026 al 15/01/2026", fechaInicio: "01/02/2026", horario: "Lun y Mie 8:00 AM - 12:00 PM", profesor: "María Gómez", alumnosContados: 15, salon: "Taller A-1" },
  { id: 2, nombre: "Repostería Básica", fechaInscripcion: "10/01/2026 al 25/01/2026", fechaInicio: "05/02/2026", horario: "Mar y Jue 1:00 PM - 5:00 PM", profesor: "Carlos Mendoza", alumnosContados: 12, salon: "Cocina Laboratorio" }
];

export const mockEgresados = [
  { id: 1, nombre: "José", apellido: "López", cedula: "V-20.123.456", fechaNacimiento: "18/03/1992", curso: "Mecánica Automotriz", fechaGraduacion: "15/12/2025", certificadoId: "CERT-2025-0041" }
];

/* ======================================================================
  💡 COMENTARIOS PARA EL BACKEND (MIGRACIÓN A SUPABASE):
  ======================================================================
  Al crear las tablas reales en la base de datos, toma en cuenta:
  1. Condición del Alumno: Utilizar un tipo ENUM en Postgres: 
     CREATE TYPE condicion_alumno AS ENUM ('activo', 'cesante', 'egresado');
  2. Relaciones en Cursos: El campo 'profesor' debe ser una Foreign Key (FK) 
     que apunte a la tabla 'profesores(id)'.
  3. Tabla intermedia: Para los alumnos dentro de un curso, se requerirá una 
     tabla pivote debido a la relación muchos a muchos:
     CREATE TABLE curso_alumnos (
       curso_id INT REFERENCES cursos(id),
       alumno_id INT REFERENCES alumnos(id),
       PRIMARY KEY (curso_id, alumno_id)
     );
*/