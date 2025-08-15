import { Router } from 'express';
import pool from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const { rows } = await pool.query('SELECT id, email, password_hash FROM users WHERE email=$1 AND status=$2', [email, 'active']);
  if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });
  const user = rows[0];
  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '8h' });
  res.json({ token });
});

export default router;
