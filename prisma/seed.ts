import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createOrganization() {
  function gen(): Prisma.OrganizationCreateManyInput {
    return {
      name: faker.company.name(),
      cover: faker.image.avatar(),
      avatar: faker.image.avatar(),
      desc: faker.lorem.sentence(),
    };
  }

  await prisma.organization.createMany({
    data: Array.from({ length: 10 }, gen),
  });
}

// noinspection JSIgnoredPromiseFromCall
createOrganization()
