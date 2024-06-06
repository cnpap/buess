import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '@/pages/auth/AuthLayout';
import { SignInForm } from '@/pages/auth/login/SignInForm';
import { SignUpForm } from '@/pages/auth/login/SignUpForm';

const AuthRouteTemplate = () => (
  <>
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<SignInForm />} />
        <Route path={'/auth/sign-up'} element={<SignUpForm />} />
      </Route>
    </Routes>
  </>
);

export default AuthRouteTemplate;
