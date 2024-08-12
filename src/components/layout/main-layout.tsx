import Side from '@/components/layout/side';
import { MainLayoutLeft, MainLayoutRight } from '@/components/layout/header';
import { useStore } from '@nanostores/react';
import { $routeIframesAtom } from '@/routes/store';
import { useInitRouteIframes } from '@/routes/hooks';
import React from 'react';

export default function MainLayout() {
  useInitRouteIframes();
  const routeIframes = useStore($routeIframesAtom);
  return (
    <div className="grid h-screen w-full pl-[6rem]">
      <Side />
      <div
        className="
    grid h-14 lg:h-[60px] w-full md:grid-cols-[160px_1fr] lg:grid-cols-[200px_1fr] border-b bg-muted
    sticky top-0 z-10
    "
      >
        <MainLayoutLeft />
        <div className="flex flex-col">
          <MainLayoutRight />
          <main className="h-[calc(100vh-var(--header-height))] flex flex-1 overflow-auto md:grid-cols-2 lg:grid-cols-3">
            {routeIframes
              .map((routeIframe) => {
                const src = routeIframe.src.replace(/\/main/, '');
                if (!routeIframe.isLoaded) {
                  return null;
                }
                return (
                  <div
                    style={{
                      display: routeIframe.current ? 'block' : 'none',
                    }}
                    key={routeIframe.src}
                    className="w-full h-full"
                  >
                    <iframe title={routeIframe.title} src={src} className="w-full h-full" />
                  </div>
                );
              })
              .filter(Boolean)}
          </main>
        </div>
      </div>
    </div>
  );
}
