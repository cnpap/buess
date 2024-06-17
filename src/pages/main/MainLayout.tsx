import Aside from '@/pages/main/Aside';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="grid h-screen w-full pl-[4rem]">
      <Aside />
      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <Outlet />
      </main>
    </div>
  );
}
