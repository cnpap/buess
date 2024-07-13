export type OrganizationPayload = {
  lock?: boolean;
  id: string;
  name: string;
  custom_data: {
    coverImage?: string;
  };
  created_at: string;
  description: string | null;
  roles: {
    id: string;
    name: string;
  }[];
};

export interface UserPayload {
  organizations: OrganizationPayload[];
  jti: string;
  // 用户 ID
  sub: string;
  iat: number;
  exp: number;
  scope: string;
  client_id: string;
  iss: string;
  aud: string;
}

export type Required<T> = {
  [P in keyof T]-?: T[P];
};

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
