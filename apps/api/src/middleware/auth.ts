import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request { user?: { id: number, email: string }; }

export function authRequired(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorised' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = { id: payload.id, email: payload.email };
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
