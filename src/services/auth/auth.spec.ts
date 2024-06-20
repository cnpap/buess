import { beforeAll, describe, expect, test } from 'vitest';
import { signIn } from '@/services/auth/sign-in';
import { defaultPassword, primaryUserEmail } from '../../../prisma/const';
import { maPrisma } from '@/utils/facade-init';
import { getUserInfo } from '@/services/auth/userinfo';
import { testContextHelper } from 'viteser';
import { facade } from '@/utils/facade';

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

  test(
    'getuserinfo success',
    async () => {
      const primaryUser = await facade.prisma.user.findFirstOrThrow({
        where: {
          email: primaryUserEmail,
        },
      });
      const payload = {
        id: primaryUser.id,
      };
      await testContextHelper({
        payload,
        async callback() {
          const { data } = await getUserInfo();
          expect(data.payload.id).eq(primaryUser.id);
        },
      });
    },
    {
      timeout: 0,
    },
  );
});
