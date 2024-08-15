import React from 'react';
import {
  SquareUser,
  LifeBuoy,
  Grid2x2Check,
  Code2,
  Settings,
  Grid3X3,
  ScanSearch,
  Waypoints,
} from 'lucide-react';

export interface Menu {
  // 要支持输入 className
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  path: string;
  onClick?: () => void;
  children?: Menu[];
}

export const configMenu: Menu = {
  label: 'config',
  path: '/main/config',
  icon: Settings,
};

export const tableMenu: Menu = {
  label: 'table',
  path: '/main/table',
  icon: Grid3X3,
};

export const topMenus: Menu[] = [
  configMenu,
  tableMenu,
  {
    label: 'audit',
    path: '/main/conn',
    icon: ScanSearch,
  },
  {
    label: 'graph',
    path: '/main/graph',
    icon: Waypoints,
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
