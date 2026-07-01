# 🎵 EcclesiApp - Aplicación Profesional para Iglesias

Una aplicación moderna, rápida y profesional para la gestión de servicios religiosos, canciones, versículos y proyecciones en tiempo real. Diseñada para superar a Holyrics en velocidad, facilidad de uso y experiencia visual.

## 🎯 Características Principales

### 📚 Gestión de Contenido
- ✅ Gestión completa de canciones con letras, acordes y categorías
- ✅ Biblioteca de himnos, alabanzas y predicaciones
- ✅ Base de datos bíblica integrada (español e inglés)
- ✅ Búsqueda instantánea y resultados en tiempo real
- ✅ Importación/Exportación de contenido

### 🎬 Proyección y Presentación
- ✅ Proyección en pantalla completa de letras y versículos
- ✅ Soporte para múltiples pantallas y proyectores
- ✅ Transiciones suaves y personalizables
- ✅ Soporte para imágenes, videos y fondos personalizados
- ✅ Editor visual para crear presentaciones
- ✅ Previsualización en tiempo real

### 📱 Multiplataforma
- ✅ Aplicación de escritorio (Windows, macOS, Linux) con Electron
- ✅ Versión web responsive
- ✅ Control remoto desde Android e iPhone
- ✅ Sincronización en la nube
- ✅ Respaldo automático

### 🎨 Interfaz Moderna
- ✅ Diseño minimalista estilo Windows 11
- ✅ Modo oscuro y modo claro
- ✅ Interfaz intuitiva y fácil de usar
- ✅ Accesibilidad garantizada

### 👥 Gestión Administrativa
- ✅ Planificador de servicios y orden de culto
- ✅ Sistema multiusuario con permisos granulares
- ✅ Estadísticas de uso y reportes
- ✅ Gestión de equipos y recursos

### ⚡ Rendimiento
- ✅ Optimizado para equipos de bajos recursos
- ✅ Carga rápida de contenido
- ✅ Sincronización eficiente
- ✅ Soporte offline

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** - Servidor y APIs REST
- **Express.js** - Framework web
- **PostgreSQL** - Base de datos relacional
- **TypeScript** - Tipado seguro
- **JWT** - Autenticación
- **Prisma** - ORM moderno

### Frontend
- **React 18+** - UI library
- **TypeScript** - Tipado seguro
- **Tailwind CSS** - Estilos modernos
- **Zustand** - Estado global
- **React Query** - Manejo de datos
- **Vite** - Build tool rápido

### Aplicación de Escritorio
- **Electron** - Multiplataforma
- **IPC** - Comunicación Electron-Renderer

### Aplicación Móvil
- **Flutter** - Android e iOS
- **Provider** - State management

### DevOps & Deployment
- **Docker** - Containerización
- **GitHub Actions** - CI/CD
- **AWS/Google Cloud** - Cloud hosting

## 📁 Estructura del Proyecto

```
hol/
├── backend/                 # API Node.js + TypeScript
│   ├── src/
│   │   ├── api/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── index.ts
│   ├── prisma/
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # Aplicación React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── desktop/               # Electron app
│   ├── src/
│   ├── public/
│   └── package.json
├── mobile/               # Flutter app
│   ├── lib/
│   ├── pubspec.yaml
│   └── README.md
├── docker/              # Configuración Docker
├── docs/               # Documentación
└── README.md           # Este archivo
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+
- PostgreSQL 14+
- Git

### Backend
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Desktop (Electron)
```bash
cd desktop
npm install
npm run dev
```

### Mobile (Flutter)
```bash
cd mobile
flutter pub get
flutter run
```

## 📖 Documentación

- [Guía de Instalación](./docs/INSTALACION.md)
- [API Documentation](./docs/API.md)
- [Contribución](./CONTRIBUTING.md)
- [Licencia](./LICENSE)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, lee [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles.

---

**EcclesiApp** - Llevando la tecnología moderna a las iglesias ✨
