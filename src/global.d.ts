declare module 'koa2-connect' {
  import { Middleware } from 'koa';
  // noinspection JSUnusedGlobalSymbols
  export default function k2c(middleware: Middleware): Middleware;
}
