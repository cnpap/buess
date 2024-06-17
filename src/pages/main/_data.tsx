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
    label: 'home',
    path: '/main/home',
    icon: Home,
  },
  {
    label: 'data',
    path: '/main/data',
    icon: Database,
  },
  {
    label: 'cicd',
    path: '/main/cicd',
    icon: Code2,
  },
  {
    label: 'test',
    icon: Grid2x2Check,
    path: '/main/test',
  },
];

export const bottomMenus: Menu[] = [
  {
    label: 'help',
    icon: LifeBuoy,
    path: '/main/help',
  },
  {
    label: 'account',
    icon: SquareUser,
    path: '/main/account',
  },
];
