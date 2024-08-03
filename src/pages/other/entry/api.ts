import { z } from 'zod';
import { formSchema } from '@/pages/other/entry/create-project-form.zod';
import { facade } from '@/utils/facade';
import { signIned } from '@/services/middlewares';
import { getPayload } from 'viteser/message';
import { TEAM_ROLE_MASTER } from '@/services/data/permission';
import { INVITE_ACCEPTED } from '@/services/data/enum';

export type ProjectMember = Awaited<ReturnType<typeof projectMembers>> extends (infer T)[]
  ? T
  : never;

export async function deleteProject(id: string) {
  'use server';

  const [payload] = getPayload();
  const result = await facade.kysely
    .updateTable('project')
    .where('id', '=', id)
    .where('created_by', '=', payload.sub)
    .set({
      delete_flag: true,
    })
    .executeTakeFirst();

  return {
    success: !!result.numUpdatedRows,
  };
}

async function projectMembers() {
  const [payload] = getPayload();
  return facade.kysely
    .selectFrom('project_member')
    .where('user_id', '=', payload.sub)
    .leftJoin('project', 'project.id', 'project_member.project_id')
    .where('project.delete_flag', '=', false)
    .select([
      'project_member.project_id',
      'project.name',
      'project.desc',
      'project_member.role',
      'project_member.status',
      'project.created_by',
      'project.created_at',
    ])
    .execute();
}

export async function getProjectMembers() {
  'use server';

  const data = await projectMembers();

  return {
    success: true,
    data,
  };
}

export async function createProject(values: z.infer<typeof formSchema>) {
  'use server';

  const [payload] = getPayload();
  return await facade.kysely.transaction().execute(async (tx) => {
    const project = await tx
      .insertInto('project')
      .values({
        name: values.name,
        desc: values.desc,
        created_by: payload.sub,
        created_at: new Date(),
      })
      .returning('id')
      .executeTakeFirstOrThrow();

    await tx
      .insertInto('project_member')
      .values({
        project_id: project.id,
        user_id: payload.sub,
        status: INVITE_ACCEPTED,
        role: TEAM_ROLE_MASTER.name,
      })
      .execute();

    return {
      success: true,
    };
  });
}

// noinspection JSUnusedGlobalSymbols
export async function before() {
  await signIned();
}
