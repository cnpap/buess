import { atom } from 'nanostores';
import { UserPayload } from '@/glob';

export const $userPayloadAtom = atom<UserPayload>({
  permission: [],
  sub: '',
});
