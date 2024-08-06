import { atom } from 'nanostores';

export interface RouteIframe {
  title: string;
  description?: string;
  src: string;
  isLoaded: boolean;
  current?: boolean;
}

export const $routeIframesAtom = atom<RouteIframe[]>([]);
