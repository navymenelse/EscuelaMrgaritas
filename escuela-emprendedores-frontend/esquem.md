/escuela-emprendedores-frontend
├── /public                   # Activos estáticos (Logos, imágenes de la galería, iconos)
├── /src
│   ├── /assets               # Estilos globales y fuentes
│   ├── /components           # Componentes reutilizables (Botones, Inputs, Cards)
│   │   ├── /common           # Navbar, Footer, Layout principal
│   │   └── /ui               # Componentes de diseño (KISS)
│   ├── /features             # Lógica por módulos (Desarrollo por Módulos)
│   │   ├── /home             # Mensaje institucional y accesos rápidos
│   │   ├── /about            # Historia (1964) y Misión/Visión
│   │   ├── /courses          # Especialidades (Secretariado, Repostería, etc.)
│   │   ├── /gallery          # Repositorio multimedia de logros
│   │   ├── /auth             # Login y Registro (Seguridad STRIDE)
│   │   ├── /private-zone     # Gestión de alumnos/padres y certificados
│   │   └── /blog             # Noticias y casos de éxito
│   ├── /hooks                # Lógica de estado y validaciones personalizadas
│   ├── /services             # Llamadas a API (Conexión con el servidor/Supabase)
│   ├── /utils                # Formateo de fechas, validaciones de seguridad
│   ├── /context              # Gestión del estado global (Sesión de usuario)
│   ├── App.js                # Punto de entrada principal
│   └── main.js               # Configuración inicial
├── .env                      # Variables de entorno (Seguridad)
├── tailwind.config.js        # Configuración de diseño responsivo
└── package.json