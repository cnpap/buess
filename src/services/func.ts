import * as process from 'node:process';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function genToken(payload: Record<string, any>) {
  const secret = process.env.JWT_SECRET ?? 'secret';
  const jwt = await import('jsonwebtoken');
  return jwt.default.sign(payload, secret, {
    expiresIn: '3h',
  });
}

export async function verifyToken(token: string) {
  const jwt = await import('jsonwebtoken');
  const secret = process.env.JWT_SECRET ?? 'secret';
  await new Promise((resolve, reject) => {
    jwt.default.verify(token, secret, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
}
