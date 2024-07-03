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
