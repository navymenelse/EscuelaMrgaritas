# Resumen Técnico: Sistema de Gestión Académica y Cartelera Digital "Escuela de Emprendedores"

## 1. Descripción del Proyecto
El sistema es una aplicación web integral diseñada para digitalizar los procesos administrativos y académicos de la institución. Permite la gestión de anuncios institucionales, control de matriculación, asignación de carga académica y seguimiento de calificaciones, diferenciando roles de acceso para Administración, Profesores y Alumnos.

## 2. Stack Tecnológico (MERN-ish)
- **Frontend:** React.js (Vite) - Biblioteca principal para la interfaz de usuario.
- **Estilos:** Tailwind CSS - Framework de utilidades para diseño responsivo.
- **Backend/Base de Datos:** Supabase (PostgreSQL) - Backend-as-a-Service para persistencia de datos y autenticación.
- **Seguridad:** Row Level Security (RLS) en base de datos y validaciones de sesión en el cliente.

## 3. Estructura del Proyecto (Esquema de Carpetas)
La aplicación sigue un patrón de diseño modular y organizado por características (*feature-based*), facilitando el mantenimiento:

```text
/escuela-emprendedores-frontend
├── /public                   # Activos estáticos (Logos, imágenes, iconos)
├── /src
│   ├── /assets               # Estilos globales y fuentes
│   ├── /components           # Componentes reutilizables
│   │   ├── /common           # Navbar, Footer, Layout principal
│   │   └── /ui               # Componentes de diseño (Botones, Inputs, Cards)
│   ├── /features             # Lógica por módulos (Mantenibilidad)
│   │   ├── /home             # Mensaje institucional
│   │   ├── /about            # Historia, Misión y Visión
│   │   ├── /courses          # Gestión de Especialidades
│   │   ├── /auth             # Login y Registro (Seguridad)
│   │   ├── /pizarron         # Cartelera Digital (Lógica de anuncios)
│   │   ├── /dashboardRoles   # Paneles de Admin, Profesor y Alumno
│   │   └── /private-zone     # Gestión de certificados y expedientes
│   ├── /hooks                # Lógica de estado personalizada
│   ├── /services             # Llamadas a API (Conexión Supabase)
│   ├── /utils                # Helpers (Formateo de fechas, validaciones)
│   ├── /context              # Gestión del estado global de la sesión
│   ├── App.js                # Router y punto de entrada
│   └── main.js               # Configuración de React
├── .env                      # Variables de entorno
└── tailwind.config.js        # Configuración de diseño
```

## 4. Arquitectura de Software
Se utiliza una arquitectura de **Single Page Application (SPA)** con renderizado en el cliente. El flujo de datos es unidireccional y se apoya en componentes funcionales de React para una interfaz reactiva.

## 5. Modelo de Datos y Persistencia
La base de datos PostgreSQL en Supabase utiliza un esquema relacional normalizado:
- **`usuarios` / `perfiles_*`:** Gestión de identidad y datos biográficos.
- **`cursos`:** Entidad central que vincula especialidades con profesores y horarios.
- **`inscripciones_y_notas`:** Tabla relacional (muchos a muchos) para el control académico.
- **`pizarron_anuncios`:** Gestión de comunicados con lógica de estados (`borrador`, `publicado`) y vigencia temporal.

## 6. Lógica de Negocio Destacada
- **Control de Visibilidad Dinámico:** Los anuncios se filtran mediante consultas a la base de datos comparando el rol del usuario actual con el alcance del mensaje.
- **Cálculo de Expiración:** Implementación de lógica de fechas para la depuración automática de la cartelera digital.
- **Inscripción y Vinculación:** Interfaz de administración para relacionar dinámicamente estudiantes con secciones y profesores con cursos.

## 7. Aspectos de Seguridad (Modelo STRIDE)
1.  **Autenticación:** Manejo de sesiones persistentes mediante JWT.
2.  **Autorización:** Uso de Políticas RLS (*Row Level Security*) en Supabase para asegurar que un usuario solo pueda leer o escribir datos según su rol.
3.  **Protección de Datos:** Variables de entorno para ocultar llaves de API y credenciales críticas.

## 8. Funcionalidades del Módulo "Pizarrón" (Tesis)
- **Redacción Institucional:** Formulario avanzado con opciones de permanencia (7, 30 o 180 días).
- **Estado de Publicación:** Soporte para borradores que permiten la revisión antes de la publicación oficial.
- **Interfaz Adaptativa:** Visualización optimizada de anuncios en tiempo real mediante el hook `useEffect`.

---
**Autor:** [Tu Nombre/Estudiante]  
**Título a Optar:** Técnico en Informática  
**Institución:** Escuela de Emprendedores "Las Margaritas"
```

### ¿Por qué incluimos el esquema así?
1.  **Muestra Profesionalismo:** Al separar `/features` de `/components`, le dices al jurado que conoces patrones modernos de desarrollo como el de "separación de intereses" (*Separation of Concerns*).
2.  **Justificación de Escalabilidad:** Si te preguntan "¿Cómo agregarías un módulo de pagos?", puedes responder que simplemente crearías una nueva carpeta en `/features` sin afectar la lógica del pizarrón o de los cursos.

¡Mucho éxito con este documento para tu defensa!

