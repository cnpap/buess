import { expect, describe, it } from 'vitest';
import { fetchAccessToken } from '@/services/access';

describe('test access service', () => {
  it('test fresh token', async () => {
    const result = await fetchAccessToken();
    const status = result.status;
    expect(status).toBe(200);
    const json = await result.json();
    expect(json.access_token).toBeDefined();
  });
});
