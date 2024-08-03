import { PermissionName } from '@/services/data/permission';

export interface SupabaseJwtPayload {
  app_metadata: AppMetadata;
  aud: string;
  azp: string;
  demo: string;
  email: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  role: string;
  sub: string;
  user_metadata: UserMetadata;
}

export interface AppMetadata {}

export interface UserMetadata {
  teams: JwtTeamPartPayload[];
}

export type JwtTeamPartPayload = {
  id: string;
  name: string;
  created_at: string;
  description: string | null;
  roles: {
    id: string;
    name: string;
  }[];
};

export interface UserPayload {
  // 用户 ID
  sub: string;
  permission: PermissionName[];
}

export type Required<T> = {
  [P in keyof T]-?: T[P];
};

declare module 'viteser/util' {
  // noinspection JSUnusedGlobalSymbols
  export interface ViteserJwtPayload extends SupabaseJwtPayload {}
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
