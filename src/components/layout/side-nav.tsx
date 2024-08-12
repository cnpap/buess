import styled from '@emotion/styled';
import { Button } from '@/components/ui/button';
import { Menu } from '@/components/layout/_data';
import { cn } from '@/lib/utils';
import { $menusAtom } from '@/atoms/menu';
import { useStore } from '@nanostores/react';

const StyledFullWidthNav = styled('nav')`
  & > button {
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
  return (
    <StyledFullWidthNav className="grid gap-1 p-1">
      {data.map((menu) => (
        <Button
          key={menu.label}
          variant="ghost"
          size="icon"
          onMouseEnter={() => {
            if (menu.onClick) {
              menu.onClick?.();
            } else if (menu.children) {
              $menusAtom.set(menu);
            }
          }}
          className={cn(
            'rounded-lg border border-transparent',
            menusAtom?.path.startsWith(menu.path as string) &&
              'bg-white text-black dark:bg-muted dark:text-white',
          )}
          aria-label={menu.label}
        >
          <div className={'flex flex-col gap-2 items-center'}>
            {menu.icon && <menu.icon className="size-5" />}
            <div className={'text-sm'}>{menu.label}</div>
          </div>
        </Button>
      ))}
    </StyledFullWidthNav>
  );
}
