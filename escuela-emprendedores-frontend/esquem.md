# Resumen Técnico: Sistema de Gestión Académica y Cartelera Digital "Escuela de Emprendedores"

## 1. Descripción del Proyecto
El sistema es una aplicación web integral diseñada para la automatización y digitalización de los procesos administrativos y académicos de la institución. Permite la gestión de anuncios institucionales, control de matriculación, asignación de carga docente y asentamiento de calificaciones, diferenciando de manera estricta los privilegios de acceso para tres roles principales: Administración, Profesores y Alumnos.

## 2. Stack Tecnológico (MERN-ish / Serverless Architecture)
- **Frontend:** React.js (Soportado sobre Vite) - Biblioteca principal para la construcción de interfaces de usuario basadas en componentes reactivos.
- **Estilos:** Tailwind CSS - Framework de diseño basado en clases de utilidad para interfaces adaptativas (Responsive Design).
- **Backend/Base de Datos:** Supabase (PostgreSQL) - Plataforma Backend-as-a-Service (BaaS) encargada de la persistencia de datos relacionales, autenticación y la API RESTful nativa.
- **Seguridad:** Row Level Security (RLS) a nivel de motor de base de datos y validaciones de estados de sesión en el lado del cliente.

## 3. Estructura del Proyecto (Esquema de Carpetas)
La aplicación implementa un patrón de diseño moderno enfocado en la mantenibilidad, escalabilidad y la **Separación de Intereses (Separation of Concerns)**, organizando el código por características o módulos (*feature-based*):

```text
/escuela-emprendedores-frontend
├── /public                   # Activos estáticos globales (Logos, imágenes institucionales)
├── /src
│   ├── /assets               # Estilos globales (Tailwind CSS) y fuentes
│   ├── /components           # Componentes atómicos e independientes
│   │   ├── /common           # Componentes globales de estructura (Navbar, Layout principal)
│   │   └── /ui               # Componentes de diseño base (Botones, Inputs, tarjetas)
│   ├── /features             # Arquitectura modular (Lógica aislada por dominio de negocio)
│   │   ├── /home             # Vista de inicio e identidad corporativa
│   │   ├── /about            # Reseña histórica, Misión y Visión
│   │   ├── /courses          # Visualización académica de Especialidades
│   │   ├── /auth             # Lógica de validación de credenciales y Login
│   │   ├── /pizarron         # Cartelera Digital (Componentes de control de anuncios)
│   │   └── /dashboard-roles  # Vistas privadas (Gestión de notas de profesores, admin, etc.)
│   ├── /hooks                # Hooks personalizados para abstracción de lógica repetitiva
│   ├── /services             # Archivos de configuración del cliente de Supabase e integraciones
│   ├── /utils                # Funciones auxiliares o Helpers (Formateadores de fechas y validaciones)
│   ├── App.jsx               # Enrutador principal del sistema (React Router) y control de accesos
│   └── main.jsx              # Punto de entrada de la aplicación y renderizado en el DOM
├── .env                      # Variables de entorno para protección de API Keys públicas
└── tailwind.config.js        # Archivo de configuración de estilos y extensiones de diseño

## 4. Arquitectura de Software
Se implementa una arquitectura de Single Page Application (SPA), donde la lógica de renderizado se ejecuta completamente en el navegador del cliente. El flujo de datos es estrictamente unidireccional, garantizando un rendimiento óptimo y una actualización asíncrona de la interfaz sin necesidad de recargar la página web.

5. Modelo de Datos y Persistencia Relacional
La base de datos en PostgreSQL aplica principios de normalización relacional para asegurar la integridad referencial:

usuarios / perfiles_profesores / perfiles_alumnos: Esquema de entidades especializadas para el control de datos personales y roles.

cursos: Entidad central que asocia las asignaturas curriculares con su profesor asignado, periodo, aula y horarios.

inscripciones_y_notas: Tabla de ruptura (relación Muchos a Muchos) que funciona como el núcleo del control de rendimiento escolar (Corte 1, Corte 2 y Nota Final).

pizarron_anuncios: Tabla destinada a la cartelera digital, parametrizada para manejar estados de publicación y el destinatario del mensaje (dirigido_a).

6. Lógica de Negocio Destacada
Control de Acceso y Visibilidad Dinámica: Los comunicados y funciones se segregan en tiempo de ejecución. El sistema intercepta el rol almacenado de la sesión activa y aplica filtros lógicos (where) en las consultas para mostrar la información pertinente a cada usuario.

Filtrado Semántico de Destinos: Integración de la propiedad 'publico' en el campo de segmentación de anuncios. Esto permite que el módulo de administración decida si un comunicado es exclusivamente interno o si debe proyectarse de inmediato hacia la sección pública de Noticias visible desde el Navbar.

Cálculo Automatizado de Calificaciones: Algoritmos internos en el cliente que procesan de manera proporcional los pesos institucionales (40% para el Corte 1 y 60% para el Corte 2), aplicando redondeos matemáticos antes de sincronizar masivamente los datos en Supabase a través de operaciones upsert.

7. Aspectos de Seguridad (Basado en el Estándar de la Industria)
Autenticación: Gestión segura de credenciales institucionales cruzando identidades válidas (Cédula o Correo) y verificando la persistencia mediante almacenamiento aislado de sesión (sessionStorage).

Autorización Avanzada (RLS): Implementación de políticas de seguridad a nivel de filas (Row Level Security) en Supabase. Aunque un usuario malintencionado intente consultar la base de datos externamente, el motor PostgreSQL bloquea cualquier petición que no corresponda a su rol autenticado.

Protección Perimetral: Exposición cero de datos sensibles del backend en el código fuente mediante el uso estricto de variables de entorno .env.

8. Funcionalidades del Módulo de Tesis ("Pizarrón")
Control de Permanencia Temporal: Formulario administrativo parametrizado para registrar marcas de tiempo y vigencia de las publicaciones de la cartelera.

Ciclo de Vida del Anuncio: Soporte para transiciones de estados (borrador / publicado), permitiendo auditoría de contenido antes de su masificación.

Sincronización Reactiva: Actualización inmediata de la vista mediante efectos de React (useEffect), asegurando que las modificaciones hechas por administración se reflejen en tiempo real en los paneles de los estudiantes y profesores.

### 🎓 Recomendaciones Metodológicas finales para el Estudiante:

1. **La defensa de la arquitectura modular:** Si el jurado le pregunta al estudiante: *“¿Por qué no pusiste todo el código en una sola carpeta?”*, el estudiante debe responder firmemente:
   > *"Diseñé la aplicación bajo el principio de **Arquitectura Modular Orientada a Características (Feature-Based)**. Esto garantiza que el software sea mantenible a largo plazo. Por ejemplo, la lógica de las calificaciones del profesor vive aislada dentro del módulo de roles, evitando que un cambio en las notas rompa el funcionamiento del menú de navegación público."*
2. **La defensa de la base de datos:** Si le preguntan por qué usó Supabase en lugar de un backend propio con Node.js/Express, su defensa debe ser:
   > *"Se optó por una arquitectura basada en **BaaS (Backend-as-a-Service)** con Supabase debido a que integra el motor relacional PostgreSQL de forma robusta. Esto nos permitió enfocarnos en optimizar la seguridad mediante **Políticas RLS nativas del servidor**, agilizando los tiempos de desarrollo sin sacrificar la seguridad de los expedientes de los alumnos."*