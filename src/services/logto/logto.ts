import { VITE_LOGTO_APP_ID_M2M, VITE_LOGTO_APP_ID_M2M_SECRET, VITE_LOGTO_SERVE } from '@/const';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

let tenant = 'default';

if (VITE_LOGTO_SERVE.includes('logto.app')) {
  // 如果是 logto.app 则需要设置 tenant
  // 例如 VITE_LOGTO_SERVE = https://xxxx.logto.app，tenant 为 xxxx
  const match = VITE_LOGTO_SERVE.match(/https:\/\/(.*)\.logto\.app/);
  if (match) {
    tenant = match[1];
  } else {
    throw new Error('VITE_LOGTO_SERVE is invalid');
  }
}

/**
 * expires_in 是 36000 秒，即 10 小时，如果在 9 个小时以后调用，则需要重新获取 access token
 */
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
      resource: `https://${tenant}.logto.app/api`,
      scope: 'all',
    }).toString(),
  });
};

let lastExpiresAt = 0;
let lastAccessToken = '';

const freshToken = async () => {
  if (lastExpiresAt < Date.now()) {
    const response = await fetchAccessToken();
    if (response.status > 299) {
      console.error('fetch access token failed: ' + (await response.text()));
      throw new Error('fetch access token failed');
    }
    const { access_token, expires_in } = await response.json();
    lastExpiresAt = Date.now() + (expires_in - 10) * 1000;
    lastAccessToken = access_token;
  }
};

const throttle = (fn: () => Promise<void>, delay: number) => {
  let lastCall = 0;
  let timer: null | NodeJS.Timeout = null;

  return async () => {
    const now = Date.now();

    if (lastCall + delay <= now) {
      lastCall = now;
      await fn();
    } else if (!timer) {
      timer = setTimeout(
        async () => {
          lastCall = Date.now();
          await fn();
          timer = null;
        },
        delay - (now - lastCall),
      );
    }
  };
};

// freshToken 节流
export const throttleFreshToken = throttle(freshToken, 1000);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// noinspection JSUnusedGlobalSymbols
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchLogto = async <T = any, R = AxiosResponse<T>, D = any>(
  options: AxiosRequestConfig<D>,
): Promise<R> => {
  options.baseURL = VITE_LOGTO_SERVE;
  if (options.headers) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${lastAccessToken}`,
    };
  } else {
    options.headers = {
      Authorization: `Bearer ${lastAccessToken}`,
    };
  }
  await throttleFreshToken();
  return axios.request<T, R, D>({
    ...options,
  });
};

export { tenant };
