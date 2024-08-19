import { Link, useLocation, useParams } from 'react-router-dom';
import { Bell, CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HeaderTabs } from '@/pages/layout/header-tabs';
import React from 'react';
import { $menusAtom } from '@/atoms/menu';
import { useStore } from '@nanostores/react';
import { cn } from '$lib/utils';
import { routeIframes } from '@/routes/hooks';

export function MainLayoutLeft() {
  const menusAtom = useStore($menusAtom);
  const location = useLocation();
  const params = useParams();
  return (
    <div className="border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen relative flex-col gap-2">
        <div className="flex h-14 items-center border-b px-5 lg:h-[60px] lg:px-6">
          <Link to="/public" className="flex items-center gap-4 font-semibold">
            <span className="">buess</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        {menusAtom.children && false && (
          <div className="absolute left-0 top-14 flex-1 py-2">
            <nav className="grid items-start px-2 space-y-1 text-sm font-medium lg:px-3">
              {menusAtom.children?.map((menuAtom) => {
                const src = `/${params.id}` + menusAtom.path + menuAtom.path;
                return (
                  <Link
                    key={menuAtom.path}
                    to={src}
                    onClick={() => {
                      routeIframes.pushRouteIframe(
                        {
                          title: menuAtom.label,
                          src,
                          isLoaded: true,
                          current: true,
                        },
                        params.id as string,
                      );
                    }}
                    className={cn(
                      'flex items-center dark:hover:text-white rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary',
                      location.pathname.startsWith(menusAtom.path + menuAtom.path) &&
                        'bg-muted dark:text-white',
                    )}
                  >
                    {menuAtom.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export function Header() {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <header className="flex justify-between h-14 items-center gap-4 px-2 lg:h-[60px]">
      <div className="w-full flex-1">
        <HeaderTabs />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
