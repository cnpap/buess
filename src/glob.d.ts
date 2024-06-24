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

// src/global.d.ts

// 扩展 Node.js 的 Global 接口
declare namespace NodeJS {
  interface Global {
    globalObject: {
      attribute1: string;
      attribute2: number;
      // 你可以根据需要添加更多属性
    };
  }
}

// 将 global 声明为 NodeJS.Global 类型
declare const global: NodeJS.Global;
