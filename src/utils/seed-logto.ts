import { ORIGINATION_ROLES, PERMISSIONS } from '@/services/data/permission';
import { VITE_BASE_URL } from '@/const';
import { facade } from './facade';
import { hashPassword, randomString } from './str';
import { DB } from 'kysely-codegen';
import path from 'path';
import fs from 'fs';
import * as process from 'node:process';
import { ApiRandomImageResponse } from '@/components/image-select/type';
import { pexelsClient } from '@/utils/api-client';

// Helper function to delete from table based on tenant_id, and exclude certain ids
async function deleteFromTable(
  tableName: keyof DB,
  excludeIds: string[] = [],
  excludeNames: string[] = [],
) {
  let q = facade.kysely.deleteFrom(tableName).where('tenant_id', '=', 'default');

  if (excludeIds.length > 0) {
    q = q.where('id', 'not in', excludeIds);
  }
  if (excludeNames.length > 0) {
    q = q.where('name', 'not in', excludeNames);
  }

  await q.execute();
}

async function cleanup() {
  await deleteFromTable('applications');
  await deleteFromTable('users');
  await deleteFromTable('organization_scopes');
  await deleteFromTable('resources', ['management-api']);
  await deleteFromTable('organization_roles');
  await deleteFromTable('organization_role_scope_relations');
  await deleteFromTable('organization_role_user_relations');
  await deleteFromTable('organizations');
  await deleteFromTable('organization_user_relations');
  await deleteFromTable(
    'roles',
    ['admin-role'],
    ['#internal:admin', 'Logto Management API access'],
  );
  await deleteFromTable('applications_roles');
  console.log('Cleanup complete');
}

let buessAppId = '';
let m2mAppId = '';
let m2mAppSecret = '';
let uid = '';

async function recreateCustomJwt() {
  await facade.kysely
    .deleteFrom('logto_configs')
    .where('tenant_id', '=', 'default')
    .where('key', '=', 'jwt.accessToken')
    .execute();
  await facade.kysely
    .insertInto('logto_configs')
    .values({
      tenant_id: 'default',
      key: 'jwt.accessToken',
      value: `{
  "script": "const getCustomJwtClaims = async ({ context }) => {\\n  const { organizations, organizationRoles } = context.user;\\n  const updatedOrganizations = organizations.map(organization => ({\\n    ...organization,\\n    roles: organizationRoles.filter(role => role.organizationId === organization.id)\\n  }));\\n\\n  return {\\n    organizations: updatedOrganizations,\\n  };\\n};"
}`,
    })
    .execute();
}

// Function to ensure the application exists
async function recreateApplication() {
  const appName = 'buess';
  const { id } = await facade.kysely
    .insertInto('applications')
    .values({
      tenant_id: 'default',
      id: randomString(21),
      name: appName,
      description: appName,
      secret: randomString(),
      type: 'SPA',
      oidc_client_metadata: {
        redirectUris: [`${VITE_BASE_URL}/callback`],
        postLogoutRedirectUris: [`${VITE_BASE_URL}/auth`],
      },
      custom_client_metadata: {},
      is_third_party: false,
      created_at: new Date(),
    })
    .returning('id')
    .executeTakeFirstOrThrow();
  buessAppId = id;

  // 创建 m2m 应用
  const m2mAppName = 'm2m';

  m2mAppId = randomString(21);
  m2mAppSecret = randomString();
  const m2mApp = await facade.kysely
    .insertInto('applications')
    .values({
      tenant_id: 'default',
      id: m2mAppId,
      name: m2mAppName,
      description: m2mAppName,
      secret: m2mAppSecret,
      type: 'MachineToMachine',
      oidc_client_metadata: {
        redirectUris: [],
        postLogoutRedirectUris: [],
      },
      custom_client_metadata: {},
      is_third_party: false,
      created_at: new Date(),
    })
    .returning(['id'])
    .executeTakeFirstOrThrow();

  // 找到 m2m 的全部权限 id ，名为 Logto Management API access
  const managementApi = await facade.kysely
    .selectFrom('roles')
    .where('name', '=', 'Logto Management API access')
    .select('id')
    .executeTakeFirstOrThrow();

  // 将 m2m 应用与权限关联
  await facade.kysely
    .insertInto('applications_roles')
    .values({
      tenant_id: 'default',
      application_id: m2mApp.id,
      role_id: managementApi.id,
      id: randomString(21),
    })
    .execute();
}

// Helper function to recreate users
async function recreateUsers() {
  const { id } = await facade.kysely
    .insertInto('users')
    .values([
      {
        tenant_id: 'default',
        id: randomString(12),
        primary_email: 'justlikesuolong@outlook.com',
        primary_phone: '1234567890',
        username: 'suolong',
        name: 'suolong',
        password_encrypted: await hashPassword('a12345678'),
        password_encryption_method: 'Argon2i',
        profile: {},
        application_id: buessAppId,
        identities: {},
        custom_data: {},
        logto_config: {},
        is_suspended: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
    .returning(['id'])
    .executeTakeFirstOrThrow();

  uid = id;
}

// Helper function to recreate organization
async function recreateOrganization() {
  const orgName = 'BUESSTEAM';
  const orgId = randomString(21);

  const res = (await pexelsClient.photos.curated({
    per_page: 1,
  })) as unknown as ApiRandomImageResponse;
  const coverImage = res.photos[0].src.original;

  await facade.kysely
    .insertInto('organizations')
    .values({
      tenant_id: 'default',
      id: orgId,
      name: orgName,
      description: orgName,
      custom_data: {
        coverImage,
      },
      created_at: new Date(),
    })
    .execute();

  // 将用户加入组织
  await facade.kysely
    .insertInto('organization_user_relations')
    .values({
      tenant_id: 'default',
      organization_id: orgId,
      user_id: uid,
    })
    .execute();

  // 为用户分配 origination:role:master 角色
  const role = await facade.kysely
    .selectFrom('organization_roles')
    .where('name', '=', 'origination:role:master')
    .select('id')
    .executeTakeFirstOrThrow();

  await facade.kysely
    .insertInto('organization_role_user_relations')
    .values({
      tenant_id: 'default',
      organization_role_id: role.id,
      user_id: uid,
      organization_id: orgId,
    })
    .execute();
}

// Helper function to insert permissions into organization_scopes
async function insertOrganizationScopes() {
  return facade.kysely
    .insertInto('organization_scopes')
    .values(
      PERMISSIONS.map((permission) => ({
        tenant_id: 'default',
        name: permission.name,
        description: permission.description,
        id: randomString(21),
      })),
    )
    .returning(['id', 'name'])
    .execute();
}

// Function to ensure the first resource exists and is set to default
async function recreateFirstResource() {
  const resourceName = 'buess';
  const resourceUri = 'https://buess.airco.cc';

  await facade.kysely
    .insertInto('resources')
    .values({
      tenant_id: 'default',
      id: randomString(20),
      name: resourceName,
      indicator: resourceUri,
      is_default: true,
      access_token_ttl: 3600,
    })
    .execute();
}

// Function to recreate origination roles and sync their scopes
async function recreateOriginationRoles() {
  const roles = await facade.kysely
    .insertInto('organization_roles')
    .values(
      ORIGINATION_ROLES.map((role) => ({
        tenant_id: 'default',
        name: role.name,
        description: role.description,
        id: randomString(21),
      })),
    )
    .returning(['id', 'name'])
    .execute();

  const roleScopes = await insertOrganizationScopes();

  await facade.kysely
    .insertInto('organization_role_scope_relations')
    .values(
      roleScopes.flatMap((scope) =>
        roles.map((role) => ({
          tenant_id: 'default',
          organization_role_id: role.id,
          organization_scope_id: scope.id,
        })),
      ),
    )
    .execute();
}

// Main function to execute all setup steps
async function setup() {
  try {
    await cleanup();
    await recreateCustomJwt();
    await recreateApplication();
    await recreateUsers();
    await recreateFirstResource();
    await recreateOriginationRoles();
    await recreateOrganization();
    console.log('Setup complete');

    /**
     * 将 buessAppId 的值写入 .env 文件
     */
    const pathname = path.resolve(process.cwd(), '.env');
    const envFile = fs.readFileSync(pathname, 'utf-8');
    const newEnvFile = envFile
      .replace(/VITE_LOGTO_APP_ID=.*/, `VITE_LOGTO_APP_ID=${buessAppId}`)
      .replace(/VITE_LOGTO_APP_ID_M2M=.*/, `VITE_LOGTO_APP_ID_M2M=${m2mAppId}`)
      .replace(/VITE_LOGTO_APP_ID_M2M_SECRET=.*/, `VITE_LOGTO_APP_ID_M2M_SECRET=${m2mAppSecret}`);
    fs.writeFileSync(pathname, newEnvFile);
    console.log(`Wrote buessAppId to .env: ${buessAppId}`);

    process.exit(0);
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

// Execute the setup function
// noinspection JSIgnoredPromiseFromCall
setup();
