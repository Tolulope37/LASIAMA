import { Router } from 'express';
import pool from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

// List assets with optional bbox filter
router.get('/', async (req, res) => {
  const { bbox, type, status, search } = req.query as any;
  let where = 'WHERE 1=1';
  const params:any[] = [];
  if (type) { params.push(type); where += ` AND type = $${params.length}`; }
  if (status) { params.push(status); where += ` AND status = $${params.length}`; }
  if (search) { params.push(`%${search}%`); where += ` AND (name ILIKE $${params.length} OR address ILIKE $${params.length})`; }
  if (bbox) {
    const parts = bbox.split(',').map(Number);
    if (parts.length === 4) {
      const [minLng, minLat, maxLng, maxLat] = parts;
      params.push(minLng, minLat, maxLng, maxLat);
      where += ` AND point && ST_MakeEnvelope($${params.length-3}, $${params.length-2}, $${params.length-1}, $${params.length}, 4326)`;
    }
  }
  const sql = `SELECT id, name, type, status, lga, address, latitude, longitude FROM assets ${where} ORDER BY id DESC LIMIT 500`;
  const { rows } = await pool.query(sql, params);
  res.json(rows);
});

// Get one
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM assets WHERE id=$1', [id]);
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

// Create
router.post('/', authRequired, async (req, res) => {
  const { name, type, status, lga, address, latitude, longitude, boundary } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const params:any[] = [name, type || null, status || 'active', lga || null, address || null, latitude || null, longitude || null];
  let sql = `INSERT INTO assets (name, type, status, lga, address, latitude, longitude`;
  let values = `VALUES ($1,$2,$3,$4,$5,$6,$7`;
  if (boundary) {
    sql += `, boundary`;
    values += `, ST_SetSRID(ST_GeomFromGeoJSON($8),4326)`;
    params.push(JSON.stringify(boundary));
  }
  sql += `) ${values}) RETURNING id`;
  const { rows } = await pool.query(sql, params);
  res.status(201).json({ id: rows[0].id });
});

// Update
router.patch('/:id', authRequired, async (req, res) => {
  const fields = ['name','type','status','lga','address','latitude','longitude'];
  const sets:string[] = [];
  const params:any[] = [];
  fields.forEach((k, i) => {
    if (k in req.body) {
      params.push(req.body[k]);
      sets.push(`${k} = $${params.length}`);
    }
  });
  if ('boundary' in req.body) {
    params.push(JSON.stringify(req.body.boundary));
    sets.push(`boundary = ST_SetSRID(ST_GeomFromGeoJSON($${params.length}),4326)`);
  }
  if (!sets.length) return res.status(400).json({ error: 'No changes' });
  params.push(req.params.id);
  const sql = `UPDATE assets SET ${sets.join(', ')}, updated_at = now() WHERE id=$${params.length}`;
  await pool.query(sql, params);
  res.json({ ok: true });
});

// Delete (soft delete could be added later)
router.delete('/:id', authRequired, async (req, res) => {
  await pool.query('DELETE FROM assets WHERE id=$1', [req.params.id]);
  res.json({ ok: true });
});

export default router;
