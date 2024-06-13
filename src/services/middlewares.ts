import { verifyToken } from '@/services/func';
import { context, getTokenByHeaders } from 'viteser';

export async function logined() {
  const ctx = context();
  const token = getTokenByHeaders(ctx.headers);
  try {
    await verifyToken(token);
  } catch (e) {
    return {
      type: 'error',
      message: '请重新登录',
    };
  }
}
