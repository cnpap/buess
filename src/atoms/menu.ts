import { atom } from 'nanostores';
import { configMenu, Menu } from '@/pages/layout/_data';

export const $menusAtom = atom<Menu>(configMenu);

export const $menusOpenAtom = atom<boolean>(false);
