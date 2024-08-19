import Side from '@/pages/layout/side';
import { Header } from '@/pages/layout/header';
import { useStore } from '@nanostores/react';
import { $routeIframesAtom } from '@/routes/store';
import { useInitRouteIframes } from '@/routes/hooks';
import React from 'react';
import { $menusOpenAtom } from '@/atoms/menu';
import { useNavigate } from 'react-router-dom';

function listen40x(logout: () => void) {
  const channel = new BroadcastChannel('40x');
  channel.onmessage = () => {
    logout();
  };
}

export default function MainLayout() {
  useInitRouteIframes();
  const routeIframes = useStore($routeIframesAtom);
  const menusOpenAtom = useStore($menusOpenAtom);
  const navigate = useNavigate();
  listen40x(() => {
    navigate('/auth');
  });
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
