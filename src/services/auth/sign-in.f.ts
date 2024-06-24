import { z } from 'zod';

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
