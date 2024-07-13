import Aside from '@/components/layout/aside';
import Header from '@/components/layout/header';
import { useStore } from '@nanostores/react';
import { $routeIframesAtom } from '@/routes/store';
import { useSearchParams } from 'react-router-dom';
import { homePathname, useInitRouteIframes } from '@/routes/hooks';

export default function Dashboard() {
  useInitRouteIframes();
  const routeIframes = useStore($routeIframesAtom);
  const [searchParams] = useSearchParams();
  const realSearchParams = searchParams.get('path')?.replace('$', '&');
  return (
    <div className="grid h-screen w-full pl-[6rem]">
      <Aside />
      <Header />
      <main className="h-[calc(100vh-var(--header-height))] flex-1 overflow-auto md:grid-cols-2 lg:grid-cols-3">
        {routeIframes.map((routeIframe) => (
          <div key={routeIframe.key} className="w-full h-full">
            {routeIframe.isLoaded && (
              <iframe
                title={routeIframe.title}
                src={routeIframe.src}
                style={{
                  display: [realSearchParams, homePathname].includes(routeIframe.src)
                    ? 'block'
                    : 'none',
                }}
                className="w-full h-full"
              />
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
