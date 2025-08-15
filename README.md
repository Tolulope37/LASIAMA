# LASIAMA Platform 🏢

A comprehensive digital asset management platform for land and property administration, built specifically for Lagos State, Nigeria (LASIAMA - **L**agos **A**sset **S**tate **I**nventory **A**nd **M**anagement **A**gency).

## 🚀 Features

- **🗺️ Interactive Map Dashboard** - MapLibre GL-powered geospatial visualization
- **📊 Asset Management** - Track and manage land/property assets with geolocation
- **👥 User Management** - Role-based access control and authentication
- **📋 Task Management** - Workflow management for asset-related tasks
- **📱 Responsive Design** - Works on desktop, tablet, and mobile devices
- **🔍 Search & Filter** - Advanced asset search and filtering capabilities

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: React, Vite, TypeScript
- **Database**: PostgreSQL with PostGIS (geospatial extension)
- **Map**: MapLibre GL (OpenStreetMap tiles)
- **Authentication**: JWT tokens
- **File Storage**: MinIO (S3-compatible)
- **Email**: MailHog (development)
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- **Docker Desktop** 4.x+ (recommended)
- **Node.js** 18+ (for local development)
- **Git** (for version control)

## ⚡ Quick Start

### Option 1: Docker (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tolulope37/LASIAMA.git
   cd LASIAMA
   ```

2. **Start the platform**:
   ```bash
   docker compose up --build
   ```

3. **Access the application**:
   - 🌐 **Web App**: http://localhost:5173
   - 🔌 **API**: http://localhost:4000/api/v1/health
   - 📧 **Email Testing**: http://localhost:8025
   - 💾 **File Storage**: http://localhost:9001

4. **Login** (auto-created on first run):
   - Email: `admin@lasiama.local`
   - Password: `admin123`

### Option 2: Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment** (optional for local development):
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start services separately**:
   ```bash
   # Terminal 1: Start web app
   npm run web-dev

   # Terminal 2: Start API (requires database)
   npm run api-dev
   ```

## 🏗️ Project Structure

```
LASIAMA/
├── apps/
│   ├── api/                 # Backend API server
│   │   ├── src/
│   │   │   ├── routes/      # API endpoints
│   │   │   ├── middleware/  # Auth middleware
│   │   │   └── db.ts        # Database connection
│   │   └── Dockerfile
│   └── web/                 # Frontend React app
│       ├── src/
│       │   ├── pages/       # React pages
│       │   └── App.tsx      # Main app component
│       └── Dockerfile
├── db/
│   └── init/               # Database initialization scripts
│       └── 001_init.sql    # Schema & initial data
├── docker-compose.yml      # Multi-service configuration
└── README.md
```

## 🔧 Development

### Available Scripts

```bash
# Start full platform with Docker
docker compose up --build

# Stop all services
docker compose down -v

# Frontend development server
npm run web-dev

# Backend development server  
npm run api-dev

# Build production bundles
npm run build
```

### Database Schema

The platform includes these main entities:
- **Users** - Authentication and role management
- **Assets** - Land/property records with geospatial data
- **Tasks** - Workflow management
- **Inspections** - Asset inspection records
- **Audit Logs** - Activity tracking

## 🚀 API Endpoints

- `GET /api/v1/health` - Health check
- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/assets` - List assets (with bbox filtering)
- `POST /api/v1/assets` - Create new asset
- `GET /api/v1/tasks` - List tasks
- `POST /api/v1/tasks` - Create new task

## 🔒 Security Notes

⚠️ **IMPORTANT**: This configuration is for **DEVELOPMENT ONLY**

- All passwords and secrets in `docker-compose.yml` are for development
- Generate secure secrets for production deployment
- Use proper SSL/TLS certificates in production
- Configure proper firewall and network security

## 📝 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
DATABASE_URL=postgres://username:password@host:port/database
JWT_SECRET=your_super_secret_jwt_key
MINIO_ACCESS_KEY=your_minio_key
MINIO_SECRET_KEY=your_minio_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to your branch: `git push origin feature-name`
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/Tolulope37/LASIAMA/issues) page
2. Create a new issue with detailed description
3. Join our discussions for general questions

---

Built with ❤️ for Lagos State Asset Management
