import { atom, computed } from 'nanostores';
import { UserPayload } from '@/glob';
import { ORIGINATION_ROLES, OriginationRole, PermissionName } from '@/services/data/permission';

export const $userPayloadAtom = atom<UserPayload>({
  organizations: [],
} as unknown as UserPayload);

export const $currentOrganization = atom<string | null>(null);

export const $permissions = computed($userPayloadAtom, (userPayload) => {
  const pess = userPayload.organizations.map((org) => {
    const result = org.roles
      .map((role) => {
        const fined = ORIGINATION_ROLES.find((r) => r.name === role.name) as OriginationRole;
        return fined.includes;
      })
      .flat()
      .filter((item, index, arr) => arr.indexOf(item) === index);

    return {
      ...org,
      permissions: result,
    };
  });

  const getOrgId = (organizationId?: string) => {
    if (!organizationId) {
      if (!$currentOrganization.value) {
        throw new Error('No organizationId provided');
      }
      organizationId = $currentOrganization.value;
    }
    return organizationId;
  };

  return {
    pess,
    can(p: PermissionName, organizationId?: string) {
      organizationId = getOrgId(organizationId);
      const org = pess.find((org) => org.id === organizationId);
      if (!org) {
        throw new Error('Organization not found');
      }

      return org.permissions.includes(p);
    },
    hasRole(roles: string[] | string, organizationId?: string) {
      if (!Array.isArray(roles)) {
        roles = [roles];
      }
      organizationId = getOrgId(organizationId);
      const org = pess.find((org) => org.id === organizationId);
      if (!org) {
        throw new Error('Organization not found');
      }

      return org.roles.some((role) => roles.includes(role.name));
    },
  };
});
