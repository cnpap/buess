import React from 'react';
import { Home, SquareUser, LifeBuoy, Grid2x2Check, Code2, Database } from 'lucide-react';

export interface Menu {
  // 要支持输入 className
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  path: string;
}

export const topMenus: Menu[] = [
  {
    label: '首页',
    path: '/main/home',
    icon: Home,
  },
  {
    label: '数据',
    path: '/main/data',
    icon: Database,
  },
  {
    label: '集成',
    path: '/main/integration',
    icon: Code2,
  },
  {
    label: '实验',
    icon: Grid2x2Check,
    path: '/main/test',
  },
];

export const bottomMenus: Menu[] = [
  {
    label: '帮助',
    icon: LifeBuoy,
    path: '/main/help',
  },
  {
    label: '账户',
    icon: SquareUser,
    path: '/main/account',
  },
];
