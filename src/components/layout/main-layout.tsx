import Side from '@/components/layout/side';
import { Header } from '@/components/layout/header';
import { useStore } from '@nanostores/react';
import { $routeIframesAtom } from '@/routes/store';
import { useInitRouteIframes } from '@/routes/hooks';
import React from 'react';
import { $menusOpenAtom } from '@/atoms/menu';

export default function MainLayout() {
  useInitRouteIframes();
  const routeIframes = useStore($routeIframesAtom);
  const menusOpenAtom = useStore($menusOpenAtom);
  return (
    <div className="grid h-screen w-full pl-[6rem]">
      <Side />
      <div
        className="
    grid h-14 lg:h-[60px] w-full
    border-b bg-muted
    "
      >
        <div className="flex relative h-screen flex-col">
          {menusOpenAtom && <div className={'absolute top-0 left-0 w-full h-full bg-black:50'} />}
          <Header />
          <main className="h-[calc(100vh-var(--header-height))] flex flex-1 overflow-auto">
            {routeIframes
              .map((routeIframe) => {
                const src = routeIframe.src.replace(/\/main/, '');
                console.log('src', routeIframe);
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
