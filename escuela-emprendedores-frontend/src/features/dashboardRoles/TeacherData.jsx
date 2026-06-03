// src/features/dashboard-roles/TeacherData.js

export const mockMisSecciones = [
  { id: "SEC-A1", curso: "Corte y Costura Industrial", salon: "Taller A-1", matricula: 15, horario: "Lun y Mie 8:00 AM - 12:00 PM" },
  { id: "SEC-B2", curso: "Sastrería Avanzada", salon: "Taller A-2", matricula: 10, horario: "Vie 1:00 PM - 5:00 PM" }
];

export const mockMisAlumnos = [
  { id: 1, cedula: "V-28.111.222", nombre: "Luis Rodríguez", curso: "Corte y Costura Industrial", evaluacion1: "18", evaluacion2: "15", final: "17" },
  { id: 2, cedula: "V-29.333.444", nombre: "Carmen Colina", curso: "Corte y Costura Industrial", evaluacion1: "14", evaluacion2: "16", final: "15" },
  { id: 3, cedula: "V-25.444.555", nombre: "Ana Martínez", curso: "Sastrería Avanzada", evaluacion1: "12", evaluacion2: "11", final: "12" }
];

export const mockMiHorario = [
  { dia: "Lunes", bloque: "8:00 AM - 12:00 PM", actividad: "Clase Teórico-Práctica", curso: "Corte y Costura Industrial" },
  { dia: "Miércoles", bloque: "8:00 AM - 12:00 PM", actividad: "Práctica de Taller", curso: "Corte y Costura Industrial" },
  { dia: "Viernes", bloque: "1:00 PM - 5:00 PM", actividad: "Clase Modular", curso: "Sastrería Avanzada" }
];