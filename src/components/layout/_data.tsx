import React from 'react';
import { SquareUser, LifeBuoy, Grid2x2Check, Code2, Settings, PlugZap } from 'lucide-react';

export interface Menu {
  // 要支持输入 className
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  path: string;
  onClick?: () => void;
  children?: Menu[];
}

export const homeMenu: Menu = {
  label: 'home',
  path: '/main/home',
};

export const confMenu: Menu = {
  label: 'conf',
  path: '/main/conf',
  icon: Settings,
  children: [
    {
      label: 'database',
      path: '/database',
    },
    {
      label: 'storage',
      path: '/storage',
    },
    {
      label: 'queue',
      path: '/queue',
    },
    {
      label: 'ai',
      path: '/ai',
    },
    {
      label: 'service',
      path: '/service',
    },
  ],
};

export const topMenus: Menu[] = [
  confMenu,
  {
    label: 'conn',
    path: '/main/conn',
    icon: PlugZap,
    children: [
      {
        label: 'database',
        path: '/database',
      },
      {
        label: 'relation',
        path: '/relation',
      },
      {
        label: 'graph',
        path: '/graph',
      },
    ],
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
