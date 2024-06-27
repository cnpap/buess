import { env } from 'node:process';
import { createRemoteJWKSet, jwtVerify } from 'jose';

export async function verifyToken(token: string) {
  return jwtVerify(
    token,
    createRemoteJWKSet(new URL(`${env.VITE_LOGTO_SERVE}/oidc/jwks`)), // generate a jwks using jwks_uri inquired from Logto server
    {
      issuer: `${env.VITE_LOGTO_SERVE}/oidc`,
      audience: env.VITE_LOGTO_APP_ID,
    },
  );
}
