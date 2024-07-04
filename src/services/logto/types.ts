export interface LogtoApplication {
  tenantId: string;
  id: string;
  name: string;
  secret: string;
  description: string;
  type: string;
  oidcClientMetadata: LogtoApplicationOidcClientMetadata;
  customClientMetadata: CustomClientMetadata;
  protectedAppMetadata: unknown;
  isThirdParty: boolean;
  createdAt: number;
}

export interface LogtoApplicationOidcClientMetadata {
  redirectUris: string[];
  postLogoutRedirectUris: string[];
}

export interface CustomClientMetadata {}

export interface LogtoResource {
  tenantId?: string;
  name: string;
  indicator: string;
  accessTokenTtl?: number;
}

export type LogtoResourcesResponseData = LogtoResourceResponseData[];

export interface LogtoResourceResponseData {
  tenantId: string;
  id: string;
  name: string;
  indicator: string;
  isDefault: boolean;
  accessTokenTtl: number;
  scopes: Scope[];
}

export interface Scope {
  tenantId: string;
  id: string;
  resourceId: string;
  name: string;
  description: string;
  createdAt: number;
}

export type OrganizationScopesResponseData = OrganizationScopeResponseData[];

export interface OrganizationScopeResponseData {
  tenantId: string;
  id: string;
  name: string;
  description: string;
}

export type OrganizationRolesResponseData = OrganizationRoleResponseData[];

export interface OrganizationRoleResponseData {
  tenantId: string;
  id: string;
  name: string;
  description: string;
  type: string;
  scopes: OrganizationRoleScope[];
  resourceScopes: OrganizationRoleResourceScope[];
}

export interface OrganizationRoleScope {
  id: string;
  name: string;
}

export interface OrganizationRoleResourceScope {
  id: string;
  name: string;
  resource: Resource;
}

export interface Resource {
  id: string;
  name: string;
}

export interface ApplicationCreateRequestData {
  name: string;
  description: string;
  type: string;
  oidcClientMetadata: ApplicationCreateRequestOidcClientMetadata;
  customClientMetadata?: ApplicationCreateRequestCustomClientMetadata;
  isThirdParty?: boolean;
  protectedAppMetadata?: ApplicationCreateRequestProtectedAppMetadata;
}

export interface ApplicationCreateRequestOidcClientMetadata {
  redirectUris: ApplicationCreateRequestRedirectUri[];
  postLogoutRedirectUris: string[];
  backchannelLogoutUri?: string;
  backchannelLogoutSessionRequired?: boolean;
  logoUri?: string;
}

export interface ApplicationCreateRequestRedirectUri {}

export interface ApplicationCreateRequestCustomClientMetadata {
  corsAllowedOrigins: string[];
  idTokenTtl: number;
  refreshTokenTtl: number;
  refreshTokenTtlInDays: number;
  tenantId: string;
  alwaysIssueRefreshToken: boolean;
  rotateRefreshToken: boolean;
}

export interface ApplicationCreateRequestProtectedAppMetadata {
  subDomain: string;
  origin: string;
}
