import { verifyToken } from '@/services/func';
import { response, getContext, getPayload } from 'viteser/dist/util';

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
    const { payload } = await verifyToken(token);
    const [, setJwtPayload] = getPayload();
    setJwtPayload(payload);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  } catch (e: Error) {
    console.error(e);
    await response(
      {
        code: 401,
        type: 'error',
        message: '请重新登录',
      },
      401,
    );
    throw new Error('请重新登录');
  }
}
