import { SupabaseJwtPayload, UserPayload } from '@/glob';
import { getPayload } from 'viteser/message';
import jwt from 'jsonwebtoken';
import { VITE_JWT_SECRET } from '@/const';

export function verifyToken(token: string) {
  const payload = jwt.verify(token, VITE_JWT_SECRET, {
    audience: 'authenticated',
  }) as SupabaseJwtPayload;
  if (payload.exp * 1000 < Date.now()) {
    throw new Error('Token expired');
  }
  return payload;
}

export async function userPayload() {
  const [userPayload] = getPayload() as unknown as [UserPayload];

  return userPayload;
}
