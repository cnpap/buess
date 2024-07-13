import { VITE_LOGTO_APP_ID, VITE_LOGTO_SERVE } from '@/const';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { UserPayload } from '@/glob';
import { getPayload } from 'viteser/dist/util';

export async function verifyToken(token: string) {
  return jwtVerify(
    token,
    createRemoteJWKSet(new URL(`${VITE_LOGTO_SERVE}/oidc/jwks`)), // generate a jwks using jwks_uri inquired from Logto server
    {
      issuer: `${VITE_LOGTO_SERVE}/oidc`,
      audience: VITE_LOGTO_APP_ID,
    },
  );
}

export async function userPayload() {
  const [userPayload] = getPayload() as unknown as [UserPayload];

  return userPayload;
}
