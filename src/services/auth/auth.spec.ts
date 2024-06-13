import { beforeAll, describe, expect, test } from 'vitest';
import { signIn } from '@/services/auth/sign-in';
import { defaultPassword, primaryUserEmail } from '../../../prisma/const';
import { maPrisma } from '@/utils/facade-init';
import { getUserInfo } from '@/services/auth/userinfo';
import { testContextHelper } from 'viteser';
import { UserJwtPayload } from '@/glob';

describe('auth test', () => {
  beforeAll(async () => {
    maPrisma();
  });

  test('sign service', async () => {
    const result = await signIn({
      email: primaryUserEmail,
      password: defaultPassword,
    });
    expect(result.type).toEqual(undefined);
    expect(result.data).not.eq(undefined);
    expect(result.data?.user.email).eq(primaryUserEmail);
    expect(result.data?.token).not.eq(undefined);
  });

  test('getuserinfo', async () => {
    try {
      await getUserInfo();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (err: { message: string }) {
      expect(err.message).contain("Cannot read properties of undefined (reading 'headers')");
    }
  });

  test('getuserinfo success', async () => {
    const payload = {
      id: 'admin',
    };
    await testContextHelper({
      payload,
      async callback() {
        const { data } = (await getUserInfo()) as unknown as { data: UserJwtPayload };
        expect(data.id).eq('admin');
      },
    });
  });
});
