import { atom } from 'nanostores';
import { UserPayload } from '@/glob';

export const $userPayloadAtom = atom<UserPayload>({
  organizations: [],
} as unknown as UserPayload);
