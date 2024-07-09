import { expect, describe, it } from 'vitest';
import { fetchAccessToken } from '@/services/logto/logto';

describe('test access service', () => {
  it('test fresh token', async () => {
    const accessTokenRes = await fetchAccessToken();
    const status = accessTokenRes.status;
    if (status !== 200) {
      console.error(await accessTokenRes.text());
    }
    expect(status).toBe(200);
    const json = await accessTokenRes.json();
    expect(json.access_token).toBeDefined();
  });
});
