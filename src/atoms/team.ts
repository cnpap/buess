import { atom } from 'nanostores';
import { UserJwtPayload } from '@/glob';
import { ProjectMemberRole } from '@prisma/client';

export const $payloadAtom = atom<UserJwtPayload>({
  id: '',
  project: {
    id: '',
    member: ProjectMemberRole.GUEST,
  },
  teams: [],
});
