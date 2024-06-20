import { verifyToken } from '@/services/func';
import { context, getTokenByHeaders, makeMiddleware } from 'viteser';

export async function signIned() {
  const ctx = context();
  try {
    const token = getTokenByHeaders(ctx.headers);
    await verifyToken(token);
  } catch (e) {
    return {
      code: 401,
      type: 'error',
      message: '请重新登录',
    };
  }
}

export const signInedMiddleware = makeMiddleware(signIned);
