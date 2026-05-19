# Docker Setup for Nelna Farm Website

This project is containerized with Docker for easy deployment and development.

## Prerequisites

- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose

## Quick Start

### Production Mode

Build and run all services (frontend, backend, MongoDB):

```bash
docker-compose up --build
```

Access the application:
- Frontend: http://localhost
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Development Mode

For development with hot reload:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Then run the frontend locally:
```bash
npm run dev
```

Access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

## Available Commands

### Start services
```bash
docker-compose up
```

### Start in background (detached mode)
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### Stop and remove volumes (clean slate)
```bash
docker-compose down -v
```

### View logs
```bash
docker-compose logs -f
```

### View specific service logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Rebuild containers
```bash
docker-compose up --build
```

### Execute commands in containers
```bash
# Access backend shell
docker-compose exec backend sh

# Access MongoDB shell
docker-compose exec mongodb mongosh -u admin -p nelna_admin_2024

# Run backend seed script
docker-compose exec backend node seed.js
```

## Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_SITE_URL=http://localhost:5173
```

### Backend (backend/.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://admin:nelna_admin_2024@mongodb:27017/nelna_farm?authSource=admin
```

## MongoDB Connection

**Development/Local:**
```
mongodb://admin:nelna_admin_2024@localhost:27017/nelna_farm?authSource=admin
```

**Inside Docker Network:**
```
mongodb://admin:nelna_admin_2024@mongodb:27017/nelna_farm?authSource=admin
```

## Project Structure

```
.
├── Dockerfile                  # Frontend production image
├── nginx.conf                  # Nginx configuration
├── docker-compose.yml          # Production orchestration
├── docker-compose.dev.yml      # Development orchestration
├── .dockerignore               # Frontend Docker ignore
├── backend/
│   ├── Dockerfile              # Backend production image
│   ├── Dockerfile.dev          # Backend development image
│   └── .dockerignore           # Backend Docker ignore
└── README.Docker.md            # This file
```

## Volumes

- `mongodb_data`: Persistent MongoDB data storage
- `mongodb_config`: MongoDB configuration

## Networks

All services communicate through the `nelna-network` bridge network.

## Health Checks

- **MongoDB**: Checks database ping every 10 seconds
- **Backend**: HTTP health check on root endpoint every 30 seconds

## Troubleshooting

### Port conflicts
If ports 80, 5000, or 27017 are already in use:
```bash
# Check what's using the port
netstat -ano | findstr :80
netstat -ano | findstr :5000
netstat -ano | findstr :27017

# Change ports in docker-compose.yml
```

### Container won't start
```bash
# View logs
docker-compose logs -f [service-name]

# Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Database connection issues
```bash
# Verify MongoDB is running
docker-compose ps

# Check MongoDB logs
docker-compose logs mongodb

# Access MongoDB shell to verify
docker-compose exec mongodb mongosh -u admin -p nelna_admin_2024
```

### Clear everything and start fresh
```bash
docker-compose down -v
docker system prune -a --volumes
docker-compose up --build
```

## Production Deployment

For production deployment:

1. Update environment variables
2. Use proper MongoDB credentials
3. Configure SSL/TLS certificates
4. Use a reverse proxy (nginx/traefik)
5. Set up proper backup strategies
6. Monitor container health

```bash
# Production build
docker-compose -f docker-compose.yml up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

## Security Notes

⚠️ **Important**: Change default MongoDB credentials before production deployment!

Update in `docker-compose.yml`:
```yaml
environment:
  MONGO_INITDB_ROOT_USERNAME: your_username
  MONGO_INITDB_ROOT_PASSWORD: your_secure_password
```

And update `MONGO_URI` in backend environment variables accordingly.
