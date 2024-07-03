import { expect, describe, it } from 'vitest';
import { fetchAccessToken, fetchApplications } from '@/services/logto/logto';
import { LogtoApplication } from '@/services/logto/types';

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

  it('test fetch applications', async () => {
    const applicationsRes = await fetchApplications();
    const status = applicationsRes.status;
    if (status !== 200) {
      console.error(await applicationsRes.text());
    }
    expect(status).toBe(200);
    const json = (await applicationsRes.json()) as LogtoApplication[];
    expect(json.length > 0).toBe(true);
  }, 0);
});
