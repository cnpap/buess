import React from 'react';
import { Home, SquareUser, LifeBuoy, Grid2x2Check, Code2, Database, FileCog } from 'lucide-react';
import { handleRouteIframes } from '@/routes/hooks';
import NiceModal from '@ebay/nice-modal-react';
import MainDataDialog from '@/pages/main/data/main-data-dialog';

export interface Menu {
  // 要支持输入 className
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  path: string;
  onClick?: () => void;
}

export const topMenus: Menu[] = [
  {
    label: 'home',
    path: '/main/home',
    icon: Home,
    onClick: () => {
      handleRouteIframes().pushRouteIframe({
        src: '/main/home',
        title: 'home',
        key: 'home',
        isLoaded: true,
      });
    },
  },
  {
    label: 'data',
    path: '/main/data',
    icon: Database,
    onClick: () => {
      // noinspection JSIgnoredPromiseFromCall
      NiceModal.show(MainDataDialog);
    },
  },
  {
    label: 'conf',
    path: '/main/conf',
    icon: FileCog,
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
