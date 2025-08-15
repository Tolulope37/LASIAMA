# 🚀 One-Click Deployment Options for LASIAMA

## Option 1: Railway (Easiest - One Click!)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template)

1. Click the button above
2. Connect your GitHub account
3. Select the LASIAMA repository
4. Railway will automatically:
   - Set up PostgreSQL with PostGIS
   - Deploy both frontend and backend
   - Generate secure environment variables

## Option 2: Vercel + PlanetScale

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Tolulope37/LASIAMA)

1. Click deploy button
2. Connect to PlanetScale for database
3. Set environment variables

## Option 3: Render (Manual Setup)

### API Service:
- Repository: https://github.com/Tolulope37/LASIAMA
- Build Command: `yarn install && yarn workspace lasiama-api run build`
- Start Command: `yarn workspace lasiama-api start`

### Database:
- Create PostgreSQL service
- Enable PostGIS extension
- Copy Internal Database URL

### Environment Variables:
```bash
DATABASE_URL=your_postgresql_url
JWT_SECRET=1f58fee427f796edd27c47047fca38682dd8a8be06bc1376e583ac18ff6e918a1645bc6ad1321a80f6a67e908dd14f9ca84479d9c220cac6d8fd47119dff093c
NODE_ENV=production
```

### Frontend Service:
- Build Command: `yarn install && yarn workspace lasiama-web run build`
- Start Command: `yarn workspace lasiama-web start`
- Environment: `VITE_API_BASE=https://your-api-url.onrender.com/api/v1`

## Option 4: Local Development

```bash
git clone https://github.com/Tolulope37/LASIAMA.git
cd LASIAMA
docker compose up --build
```

Access at: http://localhost:5173
