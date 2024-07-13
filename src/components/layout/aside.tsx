import AsideNav from '@/components/layout/aside-nav';
import { bottomMenus, topMenus } from '@/components/layout/_data';

export default function Aside() {
  return (
    <aside className="inset-y fixed w-24 left-0 z-20 flex h-full pb-2 flex-col border-r justify-between">
      <AsideNav data={topMenus} />
      <AsideNav data={bottomMenus} />
    </aside>
  );
}
