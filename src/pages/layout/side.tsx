import SideNav from '@/pages/layout/side-nav';
import { bottomMenus, topMenus } from '@/pages/layout/_data';

export default function Side() {
  return (
    <aside className="inset-y bg-primary text-white fixed w-24 left-0 z-20 flex h-full pb-2 flex-col border-r justify-between">
      <SideNav data={topMenus} />
      <SideNav data={bottomMenus} />
    </aside>
  );
}
