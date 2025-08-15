import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import pool from './db.js';
import authRoutes from './routes/auth.js';
import assetsRoutes from './routes/assets.js';
import tasksRoutes from './routes/tasks.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(helmet());
app.use(morgan('dev'));

app.get('/api/v1/health', async (_req, res) => {
  try {
    // Try database connection, but don't fail if not available
    await pool.query('SELECT 1');
    res.json({ ok: true, database: true });
  } catch (e:any) {
    // Return OK even without database for basic functionality
    res.json({ ok: true, database: false, message: 'API running, database not connected', error: e.message });
  }
});

// Add root route to avoid "Cannot GET /" error
app.get('/', (_req, res) => {
  res.json({ 
    name: 'LASIAMA API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/v1/health',
      auth: '/api/v1/auth/login',
      assets: '/api/v1/assets',
      tasks: '/api/v1/tasks'
    }
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/assets', assetsRoutes);
app.use('/api/v1/tasks', tasksRoutes);

// Seed default admin if none exists
(async () => {
  const { rows } = await pool.query('SELECT COUNT(*)::int AS c FROM users');
  if (rows[0].c === 0) {
    const bcrypt = await import('bcryptjs');
    const hash = bcrypt.default.hashSync('admin123', 10);
    await pool.query(
      `INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3)
       ON CONFLICT (email) DO NOTHING`,
      ['Administrator', 'admin@lasiama.local', hash]
    );
    console.log('Seeded admin user: admin@lasiama.local / admin123');
  }
})().catch(console.error);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on :${port}`));
