declare module 'koa2-connect' {
  import type { Middleware } from 'koa';
  // noinspection JSUnusedGlobalSymbols
  export default function k2c(middleware: Middleware): Middleware;
}

export interface UserJwtPayload {
  /**
   * 用户表 id
   */
  id: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 当前租户 id、name
   */
  tid: string;
  /**
   * 具备权限，可切换的租户
   */
  tids: string[];
  /**
   * 当前租户下某个公司 id、name
   */
  cid: string;
  /**
   * 具备权限，可切换的公司
   */
  cids: string[];
}
