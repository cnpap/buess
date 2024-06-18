// noinspection JSIgnoredPromiseFromCall

import { faker } from '@faker-js/faker';
import { UserStatus, InvitationStatus, TeamRole, ProjectMemberRole, Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { defaultPassword, primaryUserEmail } from './const';
import { maPrisma } from '../src/utils/facade-init';
import { facade } from '../src/utils/facade';

maPrisma();

const { prisma } = facade;

async function clear() {
  await prisma.teamMembers.deleteMany({});
  await prisma.projectMembers.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.team.deleteMany({});
  await prisma.user.deleteMany({});
}

async function createUsers() {
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

async function createTeam() {
  function gen(): Prisma.TeamCreateManyInput {
    return {
      name: faker.company.name(),
      cover: faker.image.avatar(),
      desc: faker.lorem.sentence(),

      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  const primaryOrg: Prisma.TeamCreateManyInput = {
    name: 'Sia',
    cover: faker.image.avatar(),
    desc: faker.lorem.sentence(),

    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const teams = [
    primaryOrg,
    ...Array.from({ length: 10 }, gen),
  ];

  await prisma.team.createMany({
    data: teams,
  });
}

let primaryOrgId: string;
let primaryUserId: string;

async function getPrimaryOrgId() {
  const primaryOrg = await prisma.team.findFirst({
    where: {
      name: 'Sia',
    },
  });

  if (!primaryOrg) {
    throw new Error('Primary team not found');
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

async function createTeamMembers() {
  const primaryOrgId = await getPrimaryOrgId();
  const primaryUserId = await getPrimaryUserId();

  if (!primaryOrgId || !primaryUserId) {
    throw new Error('Primary team or user not found');
  }

  await prisma.teamMembers.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),

      role: TeamRole.ADMIN,
      status: InvitationStatus.ACCEPTED,

      teamId: primaryOrgId,
      userId: primaryUserId,
    },
  });
}

async function createProject() {
  const primaryOrgId = await getPrimaryOrgId();

  function gen(): Prisma.ProjectCreateManyInput {
    return {
      name: faker.company.name(),
      cover: faker.image.avatar(),
      desc: faker.lorem.sentence(),

      createdAt: new Date(),
      updatedAt: new Date(),

      teamId: primaryOrgId
    };
  }

  const projects = Array.from({ length: 10 }, gen);

  await prisma.project.createMany({
    data: projects,
  });
}

async function createTags() {
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
  const primaryOrgId = await getPrimaryOrgId();
  const primaryUserId = await getPrimaryUserId();

  if (!primaryOrgId || !primaryUserId) {
    throw new Error('Primary team or user not found');
  }

  const projects = await prisma.project.findMany({
    where: {
      teamId: primaryOrgId,
    },
  });

  if (!projects) {
    throw new Error('Projects not found');
  }

  const projectMembers: Prisma.ProjectMembersCreateManyInput[] = projects.map(project => {
    return {
      createdAt: new Date(),
      updatedAt: new Date(),

      role: ProjectMemberRole.CREATOR,

      projectId: project.id,
      userId: primaryUserId,
    };
  });

  await prisma.projectMembers.createMany({
    data: projectMembers,
  });
}

async function _do() {
  await clear();
  await createUsers();
  await createTeam();
  await createTeamMembers();
  await createProject();
  await createProjectMembers();
  await createTags();
}

_do();