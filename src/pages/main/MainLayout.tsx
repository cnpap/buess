import Aside from '@/pages/main/Aside';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="grid h-screen w-full pl-[5rem]">
      <Aside />
      <main className="flex-1 overflow-auto md:grid-cols-2 lg:grid-cols-3">
        <Outlet />
      </main>
    </div>
  );
}
