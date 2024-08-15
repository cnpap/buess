import styled from '@emotion/styled';
import { Menu } from '@/components/layout/_data';
import { cn } from '@/lib/utils';
import { $menusAtom } from '@/atoms/menu';
import { useStore } from '@nanostores/react';
import { useNavigate, useParams } from 'react-router-dom';
import { routeIframes } from '@/routes/hooks';

const StyledFullWidthNav = styled('div')`
  & > div {
    width: 100%;
    height: 4rem;
    padding: 2.5rem 0.5rem 2.5rem 0.5rem;

    & > div {
      font-size: 1rem;
    }
  }
`;

export default function SideNav({ data }: { data: Menu[] }) {
  const menusAtom = useStore($menusAtom);
  const id = useParams().id as string;
  const to = useNavigate();
  return (
    <StyledFullWidthNav className="grid select-none text-white gap-1 p-1">
      {data.map((menu) => (
        <div
          key={menu.path}
          onMouseEnter={() => {
            $menusAtom.set(menu);
          }}
          onClick={() => {
            routeIframes.pushRouteIframe(
              {
                title: menu.label,
                src: `/${id}` + menu.path,
                isLoaded: true,
                current: true,
              },
              id,
            );
            to(`/${id}` + menu.path);
          }}
          className={cn(
            'rounded-sm cursor-pointer flex active:bg-gray-100 dark:active:bg-slate-700 justify-center items-center outline-1 border border-transparent',
            menusAtom?.path.startsWith(menu.path as string) &&
              'bg-white text-neutral-950 dark:bg-muted dark:text-white',
          )}
        >
          <div className={'flex flex-col gap-2 items-center'}>
            {menu.icon && <menu.icon className="size-5" />}
            <div className={'text-sm'}>{menu.label}</div>
          </div>
        </div>
      ))}
    </StyledFullWidthNav>
  );
}
