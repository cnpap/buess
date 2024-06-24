import { atom } from 'nanostores';
import { UserJwtPayload } from '@/glob';

export const $payloadAtom = atom<UserJwtPayload>({
  id: '',
  project: {
    id: '',
    member: 'GUEST',
  },
  teams: [],
});
