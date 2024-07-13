import styled from '@emotion/styled';
import { Button } from '@/components/ui/button';
import { Menu } from '@/components/layout/_data';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

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

export default function AsideNav({ data }: { data: Menu[] }) {
  const location = useLocation();
  return (
    <StyledFullWidthNav className="grid gap-1 p-1">
      {data.map(({ path, onClick, label, icon: Icon }) => (
        <Button
          key={label}
          variant="ghost"
          size="icon"
          onClick={() => {
            onClick?.();
          }}
          className={cn(
            'rounded-lg border border-transparent',
            // location.pathname.startsWith(path as string) &&
            //   'bg-primary text-white hover:bg-primary hover:text-white',
            !location.pathname.startsWith(path as string) &&
              'hover:bg-white dark:hover:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-700',
          )}
          aria-label={label}
        >
          <div className={'flex flex-col gap-2 items-center'}>
            <Icon className="size-5" />
            <div>{label}</div>
          </div>
        </Button>
      ))}
    </StyledFullWidthNav>
  );
}
