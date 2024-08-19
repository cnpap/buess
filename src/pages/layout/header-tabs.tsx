import { X } from 'lucide-react';
import { $routeIframesAtom, RouteIframe } from '@/routes/store';
import { useStore } from '@nanostores/react';
import { cn } from '$lib/utils';
import { routeIframes } from '@/routes/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';

interface HeaderTabProps {
  routeIframe: RouteIframe;
  to: () => void;
  close: () => void;
}

function HeaderTab({ routeIframe, to, close }: HeaderTabProps) {
  const theme = useTheme();
  return (
    <div className={'relative'}>
      <div
        className={cn(
          'select-none h-10 delay-300 duration-300 border rounded-md pl-4 pr-8 py-2 flex items-center gap-1 bg-white dark:bg-gray-800 transition ease-in-out transform hover:cursor-pointer hover:bg-white dark:hover:bg-gray-900',
          routeIframe.current ? 'border-muted' : 'gray-rainbow-border dark:border-gray-700',
          routeIframe.current && theme.theme === 'dark' && 'dark-rainbow-border',
          routeIframe.current && theme.theme === 'light' && 'rainbow-border',
        )}
        onClick={to}
      >
        <p>{routeIframe.title}</p>
        {routeIframe.description && (
          <div className={'text-sm text-gray-400'}>{routeIframe.description}</div>
        )}
      </div>
      {!routeIframe.src.endsWith('/home') && (
        <div
          className={
            'absolute z-10 top-2.5 right-2 w-5 h-5 transform delay-100 cursor-pointer rounded-full hover:scale-110 hover:bg-red-500 transition duration-300 ease-in-out '
          }
          onClick={() => {
            close();
          }}
        >
          <X className="transition delay-75 duration-75 w-5 h-5 text-slate-800 dark:text-gray-200 hover:text-white transform cursor-pointer" />
        </div>
      )}
    </div>
  );
}

export function HeaderTabs() {
  const routeIframesAtom = useStore($routeIframesAtom);
  const navigate = useNavigate();
  const id = useParams().id as string;
  return (
    <div className={'flex gap-4'}>
      {routeIframesAtom.map((tab) => (
        <HeaderTab
          to={() => {
            navigate(tab.src);
            routeIframes.pushRouteIframe(tab, id);
          }}
          close={() => {
            routeIframes.closeRouteIframe(
              tab.src,
              (path) => {
                navigate(path);
              },
              id,
            );
          }}
          key={tab.src}
          routeIframe={tab}
        />
      ))}
    </div>
  );
}
