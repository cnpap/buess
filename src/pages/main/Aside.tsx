import SideNav from '@/pages/main/SideNav';
import { bottomMenus, topMenus } from '@/pages/main/_data';

export default function Aside() {
  return (
    <aside className="inset-y fixed w-24 left-0 z-20 flex h-full pb-2 flex-col border-r justify-between">
      <SideNav data={topMenus} />
      <SideNav data={bottomMenus} />
    </aside>
  );
}
