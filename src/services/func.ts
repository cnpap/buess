import { env } from 'node:process';
import jwt from 'jsonwebtoken';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function genToken(payload: Record<string, any>) {
  const secret = env.JWT_SECRET ?? 'secret';
  return jwt.sign(payload, secret, {
    expiresIn: '3h',
  });
}

export async function verifyToken(token: string) {
  const secret = env.JWT_SECRET ?? 'secret';
  await new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
}
