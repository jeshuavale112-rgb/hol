# Installation and Running

## Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env with your database credentials

# 4. Create database and run migrations
npx prisma migrate dev --name init

# 5. Seed database with initial data
npm run seed

# 6. Start server
npm run dev
```

Backend will run on `http://localhost:3000`

## Frontend Setup

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env

# 4. Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## Using Docker Compose

```bash
# From project root
docker-compose up
```

This will start:
- PostgreSQL on port 5432
- Redis on port 6379
- Backend on port 3000
- Frontend on port 80

## Default Test Account

- **Email**: test@example.com
- **Password**: test123

## Available Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout
- GET `/api/auth/verify` - Verify token

### Songs
- GET `/api/songs` - Get all songs (paginated, filterable)
- GET `/api/songs/:id` - Get song by ID
- POST `/api/songs` - Create song
- PATCH `/api/songs/:id` - Update song
- DELETE `/api/songs/:id` - Delete song
- GET `/api/songs/search?q=query` - Search songs
- GET `/api/songs/tags` - Get all tags

### Services
- GET `/api/services` - Get all services
- GET `/api/services/:id` - Get service by ID
- POST `/api/services` - Create service
- PATCH `/api/services/:id` - Update service
- DELETE `/api/services/:id` - Delete service

### Users
- GET `/api/users/me` - Get current user
- PATCH `/api/users/me` - Update profile

### Bible
- GET `/api/bible/search?q=query` - Search verses
- GET `/api/bible/:book/:chapter/:verse` - Get specific verse

### Presentations
- GET `/api/presentations` - Get all presentations
- GET `/api/presentations/:id` - Get presentation
- POST `/api/presentations` - Create presentation
- PATCH `/api/presentations/:id` - Update presentation
- DELETE `/api/presentations/:id` - Delete presentation
- POST `/api/presentations/:id/slides` - Add slide
