import { Prisma, TeamRole, ProjectMemberRole } from '@prisma/client';
import { InvitationStatus } from '.prisma/client';

export type ProjectPayload = Pick<Prisma.ProjectCreateInput, 'name' | 'cover' | 'id' | 'desc'>;

export type TeamPayload = {
  lock?: boolean;
  role: TeamRole;
  status: InvitationStatus;
  projects: ProjectPayload[];
} & Pick<Prisma.TeamCreateInput, 'name' | 'cover' | 'id'>;

export interface UserJwtPayload {
  /**
   * 用户表 id
   */
  id: string;
  /**
   * 所有团队
   */
  teams: TeamPayload[];
  /**
   * 当前锁定项目
   */
  project: {
    id: string;
    member: ProjectMemberRole;
  };
}
