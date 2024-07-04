import {
  asyncOrganizationRoleScopes,
  createOrganizationRole,
  createOrganizationScopes,
  createResource,
  defaultResource, deleteOrganizationRole, fetchOrganizationRoles,
  fetchOrganizationScopes,
  fetchResources,
} from '../src/services/logto/logto';
import {
  LogtoResourceResponseData,
  LogtoResourcesResponseData, OrganizationRoleResponseData, OrganizationRolesResponseData,
  OrganizationScopesResponseData,
} from '../src/services/logto/types';
import { ORIGINATION_ROLES, PERMISSIONS } from '../src/services/data/permission';

async function throwOvertimeError(errMessage: string, response: Response) {
  if (response.status > 299) {
    const message = await response.text();
    console.error(`${errMessage}: ${message}`);
    throw new Error(errMessage);
  }
}

async function firstResource() {
  const findBuess = async () => {
    const resourcesRes = await fetchResources();
    await throwOvertimeError('fetch resources failed', resourcesRes);
    const resources = await resourcesRes.json() as LogtoResourcesResponseData;
    return resources.find((r: LogtoResourceResponseData) => r.name === 'buess');
  };
  const setBuessToDefault = async () => {
    const firstResource = await findBuess();

    if (!firstResource) {
      throw new Error('createFirstResource failed');
    }

    // 设置为默认资源
    const response = await defaultResource(firstResource.id);
    await throwOvertimeError('setDefaultResource failed', response);
  };
  const createBuess = async () => {
    const resourceRes = await createResource({
      name: 'buess',
      indicator: 'https://buess.airco.cc',
    });
    await throwOvertimeError('createFirstResource failed', resourceRes);

    await setBuessToDefault();
  };

  const firstResource = await findBuess();
  if (!firstResource) {
    await createBuess();
  }
}

async function getAllScopes() {
  const allScopes = await fetchOrganizationScopes();
  await throwOvertimeError('fetch organization scopes failed', allScopes);
  return allScopes;
}

async function getAllOrganizationRoles() {
  const allRoles = await fetchOrganizationRoles();
  await throwOvertimeError('fetch organization roles failed', allRoles);
  return allRoles;
}

async function organizationScopes() {
  const allScopes = await getAllScopes();
  const existsScopes = await allScopes.json() as OrganizationScopesResponseData;
  const existsScopeNames = existsScopes.map((scope) => scope.name);
  for (const p of PERMISSIONS) {
    if (!existsScopeNames.includes(p.name)) {
      const response = await createOrganizationScopes({
        name: p.name,
        description: p.description,
      });
      await throwOvertimeError('create organization scopes failed', response);
    }
  }
}

async function originationRoles() {
  const allRoles = await getAllOrganizationRoles();
  const existsRoles = await allRoles.json() as OrganizationRolesResponseData;

  for (const r of existsRoles) {
     // await deleteOrganizationScope(r.id);
    const response = await deleteOrganizationRole(r.id);
    await throwOvertimeError('delete organization roles failed', response);
  }

  for (const p of ORIGINATION_ROLES) {
    const response = await createOrganizationRole({
      name: p.name,
      description: p.description,
    });
    await throwOvertimeError('create organization roles failed', response);
  }

  const allOriginationRoles = await getAllOrganizationRoles();
  const roleNameIdMap = new Map<string, OrganizationRoleResponseData>();
  const allRolesData = await allOriginationRoles.json() as OrganizationRolesResponseData;
  for (const role of allRolesData) {
    roleNameIdMap.set(role.name, role);
  }

  const allScopes = await getAllScopes();
  const allScopesData = await allScopes.json() as OrganizationScopesResponseData;
  const scopeNameIdMap = new Map<string, string>();
  for (const scope of allScopesData) {
    scopeNameIdMap.set(scope.name, scope.id);
  }
  for (const r of ORIGINATION_ROLES) {
    const role = roleNameIdMap.get(r.name);
    if (!role) {
      throw new Error('role not found');
    }

    const roleScopeIds = r.includes.map((scopeName) => {
      const scopeId = scopeNameIdMap.get(scopeName);
      if (!scopeId) {
        throw new Error('scope not found');
      }
      return scopeId;
    });

    const response = await asyncOrganizationRoleScopes(role.id, roleScopeIds);
    await throwOvertimeError('async organization role scopes failed', response);
  }
}

async function create() {
  // noinspection JSIgnoredPromiseFromCall
  await firstResource();
  // noinspection JSIgnoredPromiseFromCall
  await organizationScopes();
  // noinspection JSIgnoredPromiseFromCall
  await originationRoles();
}

// noinspection JSIgnoredPromiseFromCall
create()