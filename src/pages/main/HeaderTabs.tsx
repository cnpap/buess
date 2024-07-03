import { X } from 'lucide-react';
import { $routeIframesAtom, RouteIframe } from '@/routes/store';
import { useStore } from '@nanostores/react';
import { cn } from '@/lib/utils';

interface HeaderTabProps {
  routeIframe: RouteIframe;
}

function HeaderTab({ routeIframe }: HeaderTabProps) {
  return (
    <div className={'relative '}>
      <div
        className={cn(
          'select-none border hover:shadow-sm rounded-md pl-4 py-2 flex items-center gap-1 bg-white dark:bg-gray-800 transition duration-50 ease-in-out transform hover:cursor-pointer hover:bg-white dark:hover:bg-gray-900',
          routeIframe.current
            ? 'rainbow-border border-muted'
            : 'dark:border-gray-700 hover:border-gray-400 pr-6',
        )}
      >
        <p>{routeIframe.title}</p>
        {routeIframe.description && (
          <div className={'text-sm text-gray-400'}>{routeIframe.description}</div>
        )}
      </div>
      {routeIframe.key !== 'home' && (
        <div
          className={
            'absolute z-10 -top-2 -right-2 w-5 h-5 bg-pink-500 transform cursor-pointer rounded-full hover:scale-110 hover:bg-red-500 transition duration-300 ease-in-out '
          }
        >
          <X className="w-5 h-5 text-white transform cursor-pointer" />
        </div>
      )}
    </div>
  );
}

export function HeaderTabs() {
  const routeIframes = useStore($routeIframesAtom);
  return (
    <div className={'flex gap-4'}>
      {routeIframes.map((tab) => (
        <HeaderTab key={tab.key} routeIframe={tab} />
      ))}
    </div>
  );
}
