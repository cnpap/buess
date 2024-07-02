import {
  VITE_LOGTO_APP_ID_M2M,
  VITE_LOGTO_APP_ID_M2M_SECRET,
  VITE_LOGTO_SERVE,
  VITE_RESOURCE_BUESS,
} from '@/const';

export const fetchAccessToken = async () => {
  return await fetch(`${VITE_LOGTO_SERVE}/oidc/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${VITE_LOGTO_APP_ID_M2M}:${VITE_LOGTO_APP_ID_M2M_SECRET}`,
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      resource: VITE_RESOURCE_BUESS,
      scope: 'all',
    }).toString(),
  });
};
