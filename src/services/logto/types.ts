// noinspection JSUnusedGlobalSymbols

export interface PageOptions {
  q?: string;
  page?: number;
  page_size?: number;
}

export type PartiallyOptional<T, K extends keyof T> = {
  [P in K]: T[P]; // 指定的属性是必填的
} & {
  [P in Exclude<keyof T, K>]?: T[P]; // 其他属性是可选的
};
