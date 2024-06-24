import { PrismaClient } from '@prisma/client';
// noinspection ES6PreferShortImport
import { facade } from '@/utils/facade';

export function maPrisma() {
  if (!facade.prisma) {
    facade.prisma = new PrismaClient();
  }
  return facade.prisma;
}
