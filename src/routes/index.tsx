import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/pages/auth/AuthLayout';
import MainLayout from '@/pages/main/MainLayout';
import SignInForm from '@/pages/auth/login/SignInForm';
import SignUpForm from '@/pages/auth/login/SignUpForm';
import ForgotPassword from '@/pages/auth/login/ForgotPassword';
import Index from '@/pages/Index';
import MainHome from '@/pages/main/home';
import MainData from '@/pages/main/data';
import MainTest from '@/pages/main/test';
import MainCicd from '@/pages/main/cicd';
import MainConf from '@/pages/main/conf';

const RouteTemplate = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path={'/auth/sign-in'} element={<SignInForm />} />
        <Route path={'/auth/sign-up'} element={<SignUpForm />} />
        <Route path={'/auth/forgot-password'} element={<ForgotPassword />} />
      </Route>
      <Route path="/main" element={<MainLayout />}>
        <Route path="/main/home" element={<MainHome />} />
        <Route path="/main/conf" element={<MainConf />} />
        <Route path="/main/data" element={<MainData />} />
        <Route path="/main/test" element={<MainTest />} />
        <Route path="/main/cicd" element={<MainCicd />} />
      </Route>
    </Routes>
  );
};

export default RouteTemplate;
