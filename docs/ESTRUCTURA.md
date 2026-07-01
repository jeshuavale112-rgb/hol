# 📁 Estructura del Proyecto

## Árbol de Carpetas Completo

```
hol/
├── backend/                        # API REST Node.js + Express
│   ├── src/
│   │   ├── api/
│   │   │   ├── routes/            # Rutas de API
│   │   │   │   ├── auth.ts
│   │   │   │   ├── songs.ts
│   │   │   │   ├── services.ts
│   │   │   │   ├── bible.ts
│   │   │   │   └── users.ts
│   │   │   ├── controllers/       # Lógica de controladores
│   │   │   └── middlewares/       # Middlewares personalizados
│   │   ├── models/                # Modelos Prisma (ORM)
│   │   ├── services/              # Lógica de negocio
│   │   ├── utils/                 # Funciones auxiliares
│   │   ├── types/                 # Tipos TypeScript
│   │   └── index.ts               # Punto de entrada
│   ├── prisma/
│   │   ├── schema.prisma          # Esquema de base de datos
│   │   └── migrations/            # Migraciones de BD
│   ├── tests/                     # Tests unitarios e integración
│   ├── .env.example               # Variables de entorno ejemplo
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── README.md
│
├── frontend/                       # Aplicación React + Vite
│   ├── src/
│   │   ├── components/            # Componentes reutilizables
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SongCard.tsx
│   │   │   └── ServicePlan.tsx
│   │   ├── pages/                 # Páginas principales
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Songs.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Bible.tsx
│   │   │   ├── Projection.tsx
│   │   │   └── Settings.tsx
│   │   ├── hooks/                 # Custom hooks
│   │   │   ├── useSongs.ts
│   │   │   ├── useServices.ts
│   │   │   └── useAuth.ts
│   │   ├── services/              # Servicios API
│   │   │   ├── api.ts
│   │   │   ├── songService.ts
│   │   │   ├── serviceService.ts
│   │   │   └── bibleService.ts
│   │   ├── store/                 # Estado global (Zustand)
│   │   │   ├── authStore.ts
│   │   │   ├── uiStore.ts
│   │   │   └── appStore.ts
│   │   ├── types/                 # Tipos TypeScript
│   │   ├── App.tsx                # Componente raíz
│   │   ├── main.tsx               # Punto de entrada
│   │   ├── App.css
│   │   └── index.css
│   ├── public/                    # Archivos estáticos
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── README.md
│
├── desktop/                        # Electron app (Windows, macOS, Linux)
│   ├── src/
│   │   ├── main.ts                # Proceso principal de Electron
│   │   ├── preload.ts             # Scripts de preload
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   ├── electron-builder.json
│   └── README.md
│
├── mobile/                         # Flutter app (Android, iOS)
│   ├── lib/
│   │   ├── main.dart              # Punto de entrada
│   │   ├── screens/               # Pantallas de la app
│   │   ├── widgets/               # Widgets reutilizables
│   │   ├── services/              # Servicios (API, etc)
│   │   ├── models/                # Modelos de datos
│   │   └── providers/             # State management
│   ├── android/
│   ├── ios/
│   ├── pubspec.yaml               # Dependencias Flutter
│   └── README.md
│
├── docker/                         # Configuración Docker
│   ├── backend/Dockerfile
│   ├── frontend/Dockerfile
│   └── nginx/nginx.conf
│
├── docs/                           # Documentación
│   ├── INSTALACION.md
│   ├── API.md
│   ├── ESTRUCTURA.md               # Este archivo
│   ├── ARQUITECTURA.md
│   └── DEPLOYMENT.md
│
├── .github/                        # GitHub workflows y configuración
│   └── workflows/
│       ├── ci.yml
│       ├── deploy.yml
│       └── tests.yml
│
├── docker-compose.yml              # Composición de servicios Docker
├── .gitignore
├── .env.example
├── LICENSE
├── CONTRIBUTING.md
└── README.md
```

## Descripción Detallada

### Backend (`/backend`)

#### Estructura de Carpetas
- **src/api/routes/** - Definición de rutas y endpoints
- **src/api/controllers/** - Lógica de manejo de requests
- **src/api/middlewares/** - Autenticación, validación, etc
- **src/models/** - Esquemas de datos con Prisma
- **src/services/** - Lógica de negocio reutilizable
- **src/utils/** - Helpers y funciones comunes

#### Responsabilidades
- Proporcionar APIs REST
- Gestionar base de datos
- Autenticación y autorización
- WebSockets para actualizaciones en tiempo real

### Frontend (`/frontend`)

#### Estructura de Carpetas
- **src/components/** - Componentes reutilizables (Navbar, Cards, etc)
- **src/pages/** - Páginas principales de la aplicación
- **src/hooks/** - Custom React hooks para lógica reutilizable
- **src/services/** - Llamadas a API backend
- **src/store/** - Estado global con Zustand
- **src/types/** - Definiciones de tipos TypeScript

#### Responsabilidades
- Interfaz de usuario
- Interacción con el usuario
- Gestión de estado local y global
- Comunicación con backend

### Desktop (`/desktop`)

Aplicación Electron basada en el frontend React compilado.

#### Responsabilidades
- Empaquetado de aplicación React como desktop
- Acceso a APIs de sistema operativo
- Almacenamiento local
- Actualizaciones automáticas

### Mobile (`/mobile`)

Aplicación nativa con Flutter.

#### Responsabilidades
- Control remoto de proyecciones
- Acceso a recursos móviles
- Sincronización de datos
- Notificaciones push

## Flujo de Datos

```
Usuario (Frontend)
    ↓
React Components
    ↓
Zustand Store (estado global)
    ↓
React Query (data fetching)
    ↓
HTTP/WebSocket API
    ↓
Backend Express Server
    ↓
Prisma ORM
    ↓
PostgreSQL Database
```

## Patrones Utilizados

### Backend
- **MVC** - Model-View-Controller
- **Service Layer** - Separación de lógica de negocio
- **Middleware Pattern** - Procesamiento de requests
- **Repository Pattern** - Abstracción de datos

### Frontend
- **Component-based** - Componentes reutilizables
- **Custom Hooks** - Lógica reutilizable
- **State Management** - Zustand para estado global
- **Service Layer** - Abstracción de API calls

## Dependencias Clave

### Backend
- `express` - Framework web
- `prisma` - ORM y migraciones
- `jsonwebtoken` - Autenticación
- `socket.io` - WebSockets
- `typescript` - Tipado estático

### Frontend
- `react` - UI library
- `react-router-dom` - Enrutamiento
- `zustand` - State management
- `axios` - HTTP client
- `tailwindcss` - Estilos CSS

## Configuración de Desarrollo

Cada carpeta tiene su propia configuración:
- `package.json` - Dependencias y scripts
- `tsconfig.json` - Configuración TypeScript
- `.env.example` - Variables de entorno
- `Dockerfile` - Containerización

## Próximos Pasos

1. Familiarizarse con la estructura
2. Revisar documentación de [API](./API.md)
3. Comenzar con desarrollo local
4. Leer [CONTRIBUCION.md](../CONTRIBUTING.md)

---

¿Preguntas sobre la estructura? Abre un issue o contacta con el equipo.
