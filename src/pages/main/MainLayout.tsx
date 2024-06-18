import Aside from '@/pages/main/Aside';
import { Outlet } from 'react-router-dom';
import Header from '@/pages/main/Header';

export default function Dashboard() {
  return (
    <div className="grid h-screen w-full pl-[5rem]">
      <Aside />
      <Header />
      <main className="h-[calc(100vh-var(--header-height))] flex-1 overflow-auto md:grid-cols-2 lg:grid-cols-3">
        <Outlet />
      </main>
    </div>
  );
}
