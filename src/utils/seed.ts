import { facade } from '@/utils/facade';
import { VITE_FIRST_USER_ID } from '@/const';
import { TEAM_ROLE_MASTER } from '@/services/data/permission';
import { INVITE_ACCEPTED } from '@/services/data/enum';

async function clearDatabase() {
  await facade.kysely.deleteFrom('project').execute();
  await facade.kysely.deleteFrom('project_member').execute();
}

let firstProjectId: string;

async function recreateProject() {
  await facade.kysely
    .insertInto('project')
    .values({
      name: 'test project',
      desc: 'Due to forecasting and testing ai code generation, table structure relationship management, third-party platform interfacing, etc.',
      created_by: VITE_FIRST_USER_ID,
      created_at: new Date(),
    })
    .returning('id')
    .executeTakeFirstOrThrow()
    .then((project) => {
      firstProjectId = project.id;
    });

  await facade.kysely
    .insertInto('project_member')
    .values({
      project_id: firstProjectId,
      user_id: VITE_FIRST_USER_ID,
      status: INVITE_ACCEPTED,
      role: TEAM_ROLE_MASTER.name,
    })
    .execute();
}

async function seed() {
  await clearDatabase();
  await recreateProject();
}

// noinspection JSIgnoredPromiseFromCall
seed();
