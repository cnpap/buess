import { useJwtPayload } from 'viteser';
import { UserJwtPayload } from '@/glob';
import { logined } from '@/services/middlewares';

export async function getUserInfo() {
  'use server';

  const result = await logined();
  if (result) {
    return result;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [payload] = useJwtPayload<UserJwtPayload>();

  return {
    data: {
      ...payload,
    },
  };
}
