import { expect, test } from 'vitest';
import { signIn } from '@/services/auth/sign-in';
import { defaultPassword, primaryUserEmail } from '../../../prisma/const';

test('sign service', async () => {
  const result = await signIn({
    email: primaryUserEmail,
    password: defaultPassword,
  });
  expect(result.type).toEqual(undefined);
  expect(result.data).not.eq(undefined);
  expect(result.data?.email).eq(primaryUserEmail);
});
