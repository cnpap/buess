import { PrismaClient } from '@prisma/client';
import { facade } from '@/utils/facade';

export function maPrisma() {
  if (facade.prisma) {
    return;
  }
  facade.prisma = new PrismaClient();
}
