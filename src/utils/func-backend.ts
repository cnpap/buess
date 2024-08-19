import { randomBytes } from 'crypto';
import { argon2i } from 'hash-wasm';
import { PermissionName, TEAM_ROLES } from '@/services/data/permission';
import { getPayload, response } from 'viteser/message';
import { facade } from '@/utils/facade';

export const randomString = (length = 32) => {
  return randomBytes(length).toString('hex').toString().slice(0, length);
};

export const hashPassword = async (password: string) => {
  return argon2i({
    password,
    salt: randomBytes(16),
    iterations: 256,
    parallelism: 1,
    memorySize: 4096,
    hashLength: 32,
    outputType: 'encoded',
  });
};

export const getRolesByPermission = (permission: PermissionName) => {
  return TEAM_ROLES.filter((role) => role.includes.includes(permission)).map((role) => role.name);
};

export const check = async (projectId: string, permission: PermissionName) => {
  const [payload] = getPayload();
  const roles = getRolesByPermission(permission);

  const result = await facade.kysely
    .selectFrom('project_member')
    .select('role')
    .where('user_id', '=', payload.sub)
    .where('status', '=', 'accepted')
    .where('role', 'in', roles)
    .where('project_id', '=', projectId)
    .execute();

  if (result.length === 0) {
    const message = `Permission denied: ${permission}`;
    return await response(
      {
        success: false,
        message: message,
      },
      403,
    );
  }
};
