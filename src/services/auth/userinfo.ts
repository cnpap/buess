import { useJwtPayload } from 'viteser';
import { UserJwtPayload } from '@/glob';
import { signInedMiddleware } from '@/services/middlewares';

export async function getUserInfo() {
  'use server';

  await signInedMiddleware();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [payload] = useJwtPayload<UserJwtPayload>();

  return {
    data: {
      ...payload,
    },
  };
}
