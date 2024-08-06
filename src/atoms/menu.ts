import { atom } from 'nanostores';
import { confMenu, Menu } from '@/components/layout/_data';

export const $menusAtom = atom<Menu>(confMenu);
