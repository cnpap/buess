import { getUserInfo } from '@/services/auth/userinfo';
import { $payloadAtom } from '@/atoms/team';

export function preLoad() {
  return async () =>
    getUserInfo().then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('payload', JSON.stringify(res.data.payload));
      $payloadAtom.set(res.data.payload);
    });
}
