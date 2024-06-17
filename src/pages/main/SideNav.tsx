import styled from '@emotion/styled';
import { Button } from '@/components/ui/button';
import { Menu } from '@/pages/main/_data';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const StyledFullWidthNav = styled('nav')`
  & > button {
    width: 100%;
    height: 3.5rem;
    padding: 0.75rem 0.5rem 0.5rem 0.5rem;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      font-size: 0.75rem;
    }
  }
`;

export default function SideNav({ data }: { data: Menu[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <StyledFullWidthNav className="grid gap-1 p-1">
      {data.map(({ path, label, icon: Icon }) => (
        <Button
          key={path}
          variant="ghost"
          size="icon"
          onClick={() => navigate(path as string)}
          className={cn(
            'rounded-lg',
            location.pathname.startsWith(path as string) &&
              'bg-primary text-white hover:bg-primary hover:text-white',
          )}
          aria-label={label}
        >
          <div>
            <Icon className="size-5" />
            <div>{label}</div>
          </div>
        </Button>
      ))}
    </StyledFullWidthNav>
  );
}
