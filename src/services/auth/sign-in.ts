import { z } from 'zod';
import { facade } from '@/utils/facade';
import { genToken } from '@/services/func';
import { formSchema } from '@/services/auth/sign-in.f';
import { verify } from 'argon2';

const signInFailMessage = 'email or password is incorrect';

export async function signIn(values: z.infer<typeof formSchema>) {
  'use server';
  /**
   * 验证
   */
  formSchema.parse(values);

  const { email, password } = values;
  const user = await facade.prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    return {
      type: 'error',
      message: signInFailMessage,
      data: null,
    };
  }

  const isPasswordValid = await verify(user.password, password);
  if (!isPasswordValid) {
    return {
      type: 'error',
      message: signInFailMessage,
      data: null,
    };
  }

  const token = await genToken({
    id: user.id,
    email: user.email,
  });

  return {
    data: {
      user,
      token,
    },
  };
}
