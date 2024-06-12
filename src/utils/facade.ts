import { PrismaClient } from '@prisma/client';

export const facade = {
  prisma: null as unknown as PrismaClient,
};
