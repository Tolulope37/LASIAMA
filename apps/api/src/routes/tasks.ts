import { Router } from 'express';
import pool from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const { status, assigned_to } = req.query as any;
  let where = 'WHERE 1=1';
  const params:any[] = [];
  if (status) { params.push(status); where += ` AND status = $${params.length}`; }
  if (assigned_to) { params.push(assigned_to); where += ` AND assigned_to = $${params.length}`; }
  const { rows } = await pool.query(`SELECT * FROM tasks ${where} ORDER BY due_date NULLS LAST, id DESC LIMIT 500`, params);
  res.json(rows);
});

router.post('/', authRequired, async (req, res) => {
  const { asset_id, title, description, priority, category, assigned_to, due_date } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const { rows } = await pool.query(
    `INSERT INTO tasks (asset_id, title, description, priority, category, assigned_to, due_date, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
    [asset_id || null, title, description || null, priority || null, category || null, assigned_to || null, due_date || null, (req as any).user?.id || null]
  );
  res.status(201).json({ id: rows[0].id });
});

router.patch('/:id', authRequired, async (req, res) => {
  const fields = ['title','description','priority','category','assigned_to','due_date','status'];
  const sets:string[] = [];
  const params:any[] = [];
  fields.forEach((k) => {
    if (k in req.body) { params.push(req.body[k]); sets.push(`${k}=$${params.length}`); }
  });
  if (!sets.length) return res.status(400).json({ error: 'No changes' });
  params.push(req.params.id);
  await pool.query(`UPDATE tasks SET ${sets.join(', ')}, updated_at=now() WHERE id=$${params.length}`, params);
  res.json({ ok: true });
});

router.post('/:id/complete', authRequired, async (req, res) => {
  await pool.query(`UPDATE tasks SET status='complete', updated_at=now() WHERE id=$1`, [req.params.id]);
  res.json({ ok: true });
});

export default router;
