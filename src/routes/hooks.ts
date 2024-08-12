import { $routeIframesAtom, RouteIframe } from '@/routes/store';
import { useMount } from 'ahooks';
import { useParams } from 'react-router-dom';

export let homePathname = '';

export function useInitRouteIframes() {
  const params = useParams();
  useMount(() => {
    homePathname = `/${params.id}/main/home`;
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
          src: homePathname,
          isLoaded: true,
          current: true,
        },
      ]);
    }
  });
}

export const routeIframes = {
  pushRouteIframe: (routeIframe: RouteIframe) => {
    const routeIframes = $routeIframesAtom.get();
    let isExist = false;
    for (let i = 0; i < routeIframes.length; i++) {
      console.log('src', routeIframe.src, routeIframes[i].src);
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
  },
  closeRouteIframe: (src: string, to: (path: string) => void) => {
    const routeIframes = $routeIframesAtom.get();
    for (let i = 0; i < routeIframes.length; i++) {
      console.log('src', src, routeIframes[i].src);
      if (routeIframes[i].src === src) {
        if (routeIframes[i].current) {
          routeIframes[i - 1].current = true;
          to(routeIframes[i - 1].src);
        }
        routeIframes.splice(i, 1);
        $routeIframesAtom.set([...routeIframes]);
        localStorage.setItem('route:iframes', JSON.stringify(routeIframes));
        break;
      }
    }
  },
};
