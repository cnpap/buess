import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/pages/auth/auth-layout';
import MainLayout from '@/components/layout/main-layout';
import Index from '@/pages/other';
import MainHome from '@/pages/main/home';
import ProjectList from '@/pages/other/entry/project-list';
import ConfigPage from '@/pages/main/config/page';

const RouteTemplate = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/conn" element={<ProjectList />} />
      <Route path="/auth" element={<AuthLayout />} />
      <Route path="/:id/home" element={<MainHome />} />
      <Route path="/:id/config" element={<ConfigPage />} />
      <Route path="/:id/main/*" element={<MainLayout />} />
    </Routes>
  );
};

export default RouteTemplate;
