import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/pages/auth/auth-layout';
import MainLayout from '@/components/layout/main-layout';
import Index from '@/pages/other';
import MainHome from '@/pages/main/home';
import MainData from '@/pages/main/data';
import MainTest from '@/pages/main/test';
import MainCicd from '@/pages/main/cicd';
import MainConf from '@/pages/main/conf';
import AuthCallback from '@/pages/auth/auth-callback';
import ConnOrganization from '@/pages/other/entry/conn-organization';

const RouteTemplate = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/callback" element={<AuthCallback />} />
      <Route path="/conn" element={<ConnOrganization />} />
      <Route path="/auth" element={<AuthLayout />} />
      <Route path="/main/home" element={<MainHome />} />
      <Route path="/main/conf" element={<MainConf />} />
      <Route path="/main/data" element={<MainData />} />
      <Route path="/main/test" element={<MainTest />} />
      <Route path="/main/cicd" element={<MainCicd />} />
      <Route path="/main" element={<MainLayout />} />
    </Routes>
  );
};

export default RouteTemplate;
