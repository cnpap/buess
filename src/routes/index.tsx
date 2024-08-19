import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/pages/auth/auth-layout';
import MainLayout from '@/pages/layout/main-layout';
import Entry from '@/pages/entry/page';
import MainHome from '@/pages/main/home';
import ProjectList from '@/pages/entry/project-list';
import ConfigPage from '@/pages/main/config/page';

const RouteTemplate = () => {
  return (
    <Routes>
      <Route path="/" element={<Entry />} />
      <Route path="/conn" element={<ProjectList />} />
      <Route path="/auth" element={<AuthLayout />} />
      <Route path="/:id/home" element={<MainHome />} />
      <Route path="/:id/config" element={<ConfigPage />} />
      <Route path="/:id/main/*" element={<MainLayout />} />
    </Routes>
  );
};

export default RouteTemplate;
