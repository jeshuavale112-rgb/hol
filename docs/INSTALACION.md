# 📖 Guía de Instalación

## Requisitos Previos

### Obligatorios
- **Node.js** 18.x o superior
- **npm** 9.x o superior
- **PostgreSQL** 14.x o superior
- **Git**

### Opcionales
- **Docker** y **Docker Compose** (para desarrollo con contenedores)
- **Flutter SDK** (para aplicación móvil)
- **Xcode** (para iOS en macOS)
- **Android Studio** (para desarrollo Android)

## Instalación Local

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/hol.git
cd hol
```

### 2. Configurar Base de Datos PostgreSQL

```bash
# En Windows
createdb -U postgres ecclesiapp

# En macOS/Linux
createdb ecclesiapp
```

O usar Docker:
```bash
docker run --name postgres-ecclesiapp \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=ecclesiapp \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### 3. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con tu configuración
# DATABASE_URL=postgresql://user:password@localhost:5432/ecclesiapp

# Ejecutar migraciones
npx prisma migrate dev

# Iniciar servidor de desarrollo
npm run dev
```

El backend estará disponible en `http://localhost:3000`

### 4. Configurar Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## Instalación con Docker

### Usando Docker Compose

```bash
# Crear archivo .env en la raíz del proyecto
cp backend/.env.example .env

# Iniciar contenedores
docker-compose up -d

# Ejecutar migraciones
docker-compose exec backend npx prisma migrate dev

# Detener contenedores
docker-compose down
```

Acceso:
- Frontend: `http://localhost`
- Backend API: `http://localhost:3000/api`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

## Instalación de Aplicación de Escritorio (Electron)

```bash
cd desktop

npm install

npm run dev
```

## Instalación de Aplicación Móvil (Flutter)

### Configuración Inicial

```bash
cd mobile

flutter pub get
```

### Android

```bash
flutter run -d android
```

### iOS (requiere macOS)

```bash
flutter run -d ios
```

## Verificación de Instalación

### Backend
```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "version": "1.0.0"
}
```

### Frontend
Visita `http://localhost:5173` en tu navegador

## Solución de Problemas

### Error: Puerto ya en uso
```bash
# Cambiar puerto en .env o mediante variable de entorno
PORT=3001 npm run dev
```

### Error: Base de datos no conecta
```bash
# Verificar que PostgreSQL está corriendo
# En Windows
psql -U postgres -d postgres -c "SELECT version();"

# En macOS/Linux
psql -U postgres -c "SELECT version();"
```

### Error: Dependencias no instalan
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

## Variables de Entorno Importantes

```env
# Backend
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/ecclesiapp
JWT_SECRET=your-secret-key

# Frontend
VITE_API_URL=http://localhost:3000
```

## Próximos Pasos

1. Lee la documentación de [API](./API.md)
2. Explora la [estructura del proyecto](./ESTRUCTURA.md)
3. Comienza a desarrollar

---

¿Necesitas ayuda? Abre un issue o contacta con el equipo.
