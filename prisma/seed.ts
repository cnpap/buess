// noinspection JSIgnoredPromiseFromCall

import { faker } from '@faker-js/faker';
import { UserStatus, InvitationStatus, OrganizationRole, MemberRole, Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { defaultPassword, primaryUserEmail } from './const';
import { maPrisma } from '../src/utils/facade-init';
import { facade } from '../src/utils/facade';

maPrisma();

const { prisma } = facade;

async function createUsers() {
  await prisma.organizationMembers.deleteMany({});
  await prisma.user.deleteMany({});

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
  await prisma.organization.deleteMany({});

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

let primaryOrgId: string;
let primaryUserId: string;

async function getPrimaryOrgId() {
  const primaryOrg = await prisma.organization.findFirst({
    where: {
      name: 'Sia',
    },
  });

  if (!primaryOrg) {
    throw new Error('Primary organization not found');
  }

  primaryOrgId = primaryOrg.id;

  return primaryOrgId;
}

async function getPrimaryUserId() {
  const primaryUser = await prisma.user.findFirst({
    where: {
      email: primaryUserEmail,
    },
  });

  if (!primaryUser) {
    throw new Error('Primary user not found');
  }

  primaryUserId = primaryUser.id;

  return primaryUserId;
}

async function createOrganizationMembers() {
  await prisma.organizationMembers.deleteMany({});
  const primaryOrgId = await getPrimaryOrgId();
  const primaryUserId = await getPrimaryUserId();

  if (!primaryOrgId || !primaryUserId) {
    throw new Error('Primary organization or user not found');
  }

  await prisma.organizationMembers.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),

      role: OrganizationRole.ADMIN,
      status: InvitationStatus.ACCEPTED,

      organizationId: primaryOrgId,
      userId: primaryUserId,
    },
  });
}

async function createProject() {
  await prisma.project.deleteMany({});
  const primaryOrgId = await getPrimaryOrgId();

  function gen(): Prisma.ProjectCreateManyInput {
    return {
      name: faker.company.name(),
      cover: faker.image.avatar(),
      desc: faker.lorem.sentence(),

      createdAt: new Date(),
      updatedAt: new Date(),

      organizationId: primaryOrgId
    };
  }

  const projects = Array.from({ length: 10 }, gen);

  await prisma.project.createMany({
    data: projects,
  });
}

async function createTags() {
  await prisma.tag.deleteMany({});
  const projectId = await getPrimaryOrgId();

  function gen(): Prisma.TagCreateManyInput {
    return {
      name: faker.lorem.word(),
      color: faker.internet.color(),
      projectId,
    };
  }

  const tags = Array.from({ length: 10 }, gen);

  await prisma.tag.createMany({
    data: tags,
  });
}

async function createProjectMembers() {
  await prisma.members.deleteMany({});
  const primaryOrgId = await getPrimaryOrgId();
  const primaryUserId = await getPrimaryUserId();

  if (!primaryOrgId || !primaryUserId) {
    throw new Error('Primary organization or user not found');
  }

  const projects = await prisma.project.findMany({
    where: {
      organizationId: primaryOrgId,
    },
  });

  if (!projects) {
    throw new Error('Projects not found');
  }

  const projectMembers: Prisma.MembersCreateManyInput[] = projects.map(project => {
    return {
      createdAt: new Date(),
      updatedAt: new Date(),

      role: MemberRole.CREATOR,

      projectId: project.id,
      userId: primaryUserId,
    };
  });

  await prisma.members.createMany({
    data: projectMembers,
  });
}

async function _do() {
  await createUsers();
  await createOrganization();
  await createOrganizationMembers();
  await createProject();
  await createProjectMembers();
  await createTags();
}

_do();