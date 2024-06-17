import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/pages/auth/AuthLayout';
import SignInForm from '@/pages/auth/login/SignInForm';
import SignUpForm from '@/pages/auth/login/SignUpForm';
import ForgotPassword from '@/pages/auth/login/ForgotPassword';
import Home from '@/pages/Home';

const AuthRouteTemplate = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path={'/auth/sign-in'} element={<SignInForm />} />
        <Route path={'/auth/sign-up'} element={<SignUpForm />} />
        <Route path={'/auth/forgot-password'} element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
};

export default AuthRouteTemplate;
