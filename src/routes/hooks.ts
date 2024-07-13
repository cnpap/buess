import { $routeIframesAtom, RouteIframe } from '@/routes/store';
import { useMount } from 'ahooks';

export const homePathname = '/main/home';

export function useInitRouteIframes() {
  useMount(() => {
    const cache = localStorage.getItem('route:iframes');
    if (cache) {
      const routeIframes = JSON.parse(cache) as RouteIframe[];
      for (let i = 0; i < routeIframes.length; i++) {
        if (i > 0) {
          routeIframes[i].isLoaded = false;
        }
      }
      $routeIframesAtom.set(routeIframes);
    } else {
      $routeIframesAtom.set([
        {
          title: 'home',
          key: 'home',
          src: homePathname,
          isLoaded: true,
          current: true,
        },
      ]);
    }
  });
}

export function handleRouteIframes() {
  const pushRouteIframe = (routeIframe: RouteIframe) => {
    const routeIframes = $routeIframesAtom.get();
    let isExist = false;
    for (let i = 0; i < routeIframes.length; i++) {
      if (routeIframe.src === routeIframes[i].src) {
        isExist = true;
        if (routeIframes[i].current) {
          break;
        }
        routeIframe.isLoaded = true;
        routeIframes[i].current = true;
      } else {
        routeIframes[i].current = false;
      }
    }

    if (isExist) {
      $routeIframesAtom.set(routeIframes);
      localStorage.setItem('route:iframes', JSON.stringify(routeIframes));
      return;
    } else {
      routeIframe.isLoaded = true;
      routeIframes.push(routeIframe);
      $routeIframesAtom.set(routeIframes);
      localStorage.setItem('route:iframes', JSON.stringify(routeIframes));
    }
  };

  const closeRouteIframe = (key: string) => {
    const routeIframes = $routeIframesAtom.get();
    for (let i = 0; i < routeIframes.length; i++) {
      if (routeIframes[i].key === key) {
        if (routeIframes[i].current) {
          routeIframes[i - 1].current = true;
        }
        routeIframes.splice(i, 1);
        $routeIframesAtom.set(routeIframes);
        localStorage.setItem('route:iframes', JSON.stringify(routeIframes));
        break;
      }
    }
  };

  return {
    pushRouteIframe,
    closeRouteIframe,
  };
}
