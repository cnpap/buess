import { z } from 'zod';
import { formSchema } from '@/services/logto/src/organization.zod';
import { signIned } from '@/services/middlewares';
import { OrganizationPayload } from '@/glob';
import { facade } from '@/utils/facade';
import { randomString } from '@/utils/str';
import { OrganizationRoles } from 'kysely-codegen/dist/db';
import { userPayload } from '@/services/func';
import dayjs from 'dayjs';

export async function createOrganizationByUser(value: z.infer<typeof formSchema>) {
  'use server';

  await signIned();
  const payload = await userPayload();

  const ok = await facade.kysely.transaction().execute(async (tx) => {
    const { id } = await tx
      .insertInto('organizations')
      .values({
        tenant_id: 'default',
        id: randomString(21),
        name: value.name,
        description: value.description,
        custom_data: {},
        created_at: new Date(),
      })
      .returning(['id'])
      .executeTakeFirstOrThrow();
    await tx
      .insertInto('organization_user_relations')
      .values({
        tenant_id: 'default',
        user_id: payload.sub,
        organization_id: id,
      })
      .execute();
    const masterRole = await tx
      .selectFrom('organization_roles')
      .where('name', '=', 'origination:role:master')
      .select(['id'])
      .executeTakeFirstOrThrow();
    await tx
      .insertInto('organization_role_user_relations')
      .values({
        tenant_id: 'default',
        organization_id: id,
        organization_role_id: masterRole.id,
        user_id: payload.sub,
      })
      .execute();

    return true;
  });

  if (!ok) {
    throw new Error('创建失败');
  }

  return {
    success: true,
  };
}

export async function organizationsByUser() {
  'use server';

  await signIned();

  const payload = await userPayload();

  const organizations = await facade.kysely
    .selectFrom('organizations')
    .selectAll()
    .where('tenant_id', '=', 'default')
    .where(({ exists, selectFrom }) =>
      exists(
        selectFrom('organization_user_relations')
          .where('user_id', '=', payload.sub)
          .where('tenant_id', '=', 'default')
          .select('organization_id')
          .whereRef('organization_id', '=', 'organizations.id'),
      ),
    )
    .execute();

  // 获取用户有哪些角色
  const roles = await facade.kysely
    .selectFrom('organization_roles')
    .selectAll()
    .where('tenant_id', '=', 'default')
    .execute();

  const organizationRoles = await facade.kysely
    .selectFrom('organization_role_user_relations')
    .selectAll()
    .where('tenant_id', '=', 'default')
    .where('user_id', '=', payload.sub)
    .execute();

  const data: OrganizationPayload[] = organizations.map(
    (item) =>
      ({
        ...item,
        created_at: dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss'),
        roles: organizationRoles
          .filter(({ organization_id }) => organization_id === item.id)
          .map(({ organization_role_id }) => {
            const role = roles.find(
              ({ id }) => id === organization_role_id,
            ) as unknown as OrganizationRoles;
            return {
              id: role?.id,
              name: role?.name,
            };
          })
          .filter((role) => role),
      }) as unknown as OrganizationPayload,
  );
  return {
    success: true,
    data,
  };
}
