import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(255, { message: 'Name must be at most 255 characters long' }),
  desc: z
    .string()
    .max(255, { message: 'Description must be at most 255 characters long' })
    .default(''),
});
