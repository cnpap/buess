// noinspection JSIgnoredPromiseFromCall

import { faker } from '@faker-js/faker';
import { UserStatus, InvitationStatus, OrganizationRole, Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { prisma } from '../src/utils/facade';
import { defaultPassword, primaryUserEmail } from './const';

async function createUsers() {
  await prisma.organizationMembers.deleteMany({})
  await prisma.user.deleteMany({})
  function gen(): Prisma.UserCreateManyInput {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      bio: faker.lorem.sentence(),
      photo: faker.image.avatar(),
      dob: faker.date.past(),
      settings: {},

      createdAt: new Date(),
      updatedAt: new Date(),

      status: UserStatus.ACTIVE,
    };
  }

  const pwd = await hash(defaultPassword);
  const primaryUserInput: Prisma.UserCreateManyInput = {
    email: primaryUserEmail,
    password: pwd,
    name: faker.person.fullName(),
    bio: faker.lorem.sentence(),
    photo: faker.image.avatar(),
    dob: faker.date.past(),
    settings: {},

    createdAt: new Date(),
    updatedAt: new Date(),

    status: UserStatus.ACTIVE,
  };

  await prisma.user.createMany({
    data: [
      primaryUserInput,
      ...Array.from({ length: 10 }, gen),
    ],
  });
}

async function createOrganization() {
  await prisma.organization.deleteMany({})
  function gen(): Prisma.OrganizationCreateManyInput {
    return {
      name: faker.company.name(),
      cover: faker.image.avatar(),
      avatar: faker.image.avatar(),
      desc: faker.lorem.sentence(),

      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  const primaryOrg: Prisma.OrganizationCreateManyInput = {
    name: 'Sia',
    cover: faker.image.avatar(),
    avatar: faker.image.avatar(),
    desc: faker.lorem.sentence(),

    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const organizations = [
    primaryOrg,
    ...Array.from({ length: 10 }, gen),
  ];

  await prisma.organization.createMany({
    data: organizations,
  });
}

async function createOrganizationMembers() {
  await prisma.organizationMembers.deleteMany({})
  const primaryOrg = await prisma.organization.findFirst({
    where: {
      name: 'Sia',
    },
  });
  const primaryUser = await prisma.user.findFirst({
    where: {
      email: primaryUserEmail,
    },
  });

  if (!primaryOrg || !primaryUser) {
    throw new Error('Primary organization or user not found');
  }

  await prisma.organizationMembers.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),

      role: OrganizationRole.ADMIN,
      status: InvitationStatus.ACCEPTED,

      organizationId: primaryOrg.id,
      userId: primaryUser.id,
    },
  });
}

async function _do() {
  await createUsers();
  await createOrganization();
  await createOrganizationMembers();
}

_do()