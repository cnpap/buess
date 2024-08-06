import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/pages/auth/auth-layout';
import MainLayout from '@/components/layout/main-layout';
import Index from '@/pages/other';
import MainHome from '@/pages/main/home';
import MainData from '@/pages/main/data';
import MainTest from '@/pages/main/test';
import MainCicd from '@/pages/main/cicd';
import ProjectList from '@/pages/other/entry/project-list';
import ConfDatabase from '@/pages/main/conf/database';
import ConfStorage from '@/pages/main/conf/storage';

const RouteTemplate = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/conn" element={<ProjectList />} />
      <Route path="/auth" element={<AuthLayout />} />
      <Route path="/:id/home" element={<MainHome />} />
      <Route path="/:id/conf/database" element={<ConfDatabase />} />
      <Route path="/:id/conf/storage" element={<ConfStorage />} />
      <Route path="/:id/data" element={<MainData />} />
      <Route path="/:id/test" element={<MainTest />} />
      <Route path="/:id/cicd" element={<MainCicd />} />
      <Route path="/:id/main/*" element={<MainLayout />} />
    </Routes>
  );
};

export default RouteTemplate;
