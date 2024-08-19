import { facade } from '@/utils/facade';
import { signIned } from '@/services/middlewares';
import { check } from '@/utils/func-backend';
import { PermissionName } from '@/services/data/permission';
import { z } from 'zod';
import formSchema from '@/pages/main/config/form/create-config-form.zod';
import { getPayload } from 'viteser/message';
import { format } from 'date-fns';

// noinspection JSUnusedGlobalSymbols
export async function before() {
  return signIned();
}

export type ConfigList = Awaited<ReturnType<typeof configList>> extends (infer T)[] ? T : never;

async function configList(projectId: string) {
  const query = facade.kysely
    .selectFrom('database_conf')
    .select(['id', 'name', 'type', 'created_at', 'updated_at'])
    .where('delete_flag', '=', false)
    .where('project_id', '=', projectId);

  const results = await query.orderBy('created_at', 'desc').execute();

  return results.map((row) => ({
    ...row,
    created_at: format(new Date(row.created_at as Date), 'yyyy-MM-dd HH:mm:ss'),
  }));
}

export async function getConfigList(projectId: string) {
  'use server';

  await check(projectId, PermissionName.CONFIGS_SELECT);

  const list = await configList(projectId);

  return {
    success: true,
    data: list,
  };
}

export async function createConfig(data: z.infer<typeof formSchema>) {
  'use server';

  await check(data.project_id, PermissionName.CONFIGS_WRITE);

  const [payload] = getPayload();

  await facade.kysely
    .insertInto('database_conf')
    .values({
      project_id: data.project_id,
      name: data.name,
      type: data.type,
      data: data.data,
      created_by: payload.sub,
      updated_by: payload.sub,
    })
    .execute();

  return {
    success: true,
  };
}
