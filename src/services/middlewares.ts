import { verifyToken } from '@/services/func';
import { response, getContext, getPayload } from 'viteser/message';

export async function signIned() {
  try {
    const ctx = getContext();
    const headers = ctx.req.headers;
    const authorization = headers.authorization || (headers.Authorization as string) || '';
    const token = authorization.replace('Bearer ', '');
    if (!token) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error('Token is required');
    }
    const payload = verifyToken(token);
    const [, setJwtPayload] = getPayload();
    if (payload.sub.startsWith('user_')) {
      payload.sub = payload.sub.replace('user_', '');
    }
    setJwtPayload(payload);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  } catch (e: Error) {
    return response(
      {
        code: 401,
        type: 'error',
        message: '请重新登录',
      },
      401,
    );
  }
}
