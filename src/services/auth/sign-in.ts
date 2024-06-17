import { z } from 'zod';
import { facade } from '@/utils/facade';
import { genToken } from '@/services/func';

export const formSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .describe('email')
    .email({
      message: 'email is invalid',
    }),
  password: z
    .string({
      required_error: 'password is required',
    })
    .describe('password')
    .min(8, {
      message: 'password is too short, at least 8 characters',
    })
    .max(30, {
      message: 'password is too long, at most 30 characters',
    }),
});

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

  const { verify } = await import('argon2');
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
