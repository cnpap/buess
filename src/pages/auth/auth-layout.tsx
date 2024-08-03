import { useNavigate } from 'react-router-dom';
import { useUpdateEffect } from 'ahooks';
import Decorate from '@/components/decorate/decorate';
import SignInButton from '@/pages/auth/components/sign-in-button';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { useAuth } from '@clerk/clerk-react';

const words = [
  {
    text: 'Use AI Coder',
  },
  {
    text: 'in',
  },
  {
    text: '10',
    className: 'text-blue-500 dark:text-blue-500', // 红色
  },
  {
    text: 'min.',
  },
];

export default function AuthLayout() {
  const navigate = useNavigate();
  const auth = useAuth();
  useUpdateEffect(() => {
    if (auth.isLoaded) {
      if (auth.isSignedIn) {
        navigate('/conn');
      }
    }
  }, [auth.isLoaded, auth.isSignedIn]);

  return (
    <Decorate>
      <div className="flex relative flex-col z-50 items-center justify-center h-screen">
        <TypewriterEffectSmooth width={670} words={words} />
        <SignInButton />
      </div>
    </Decorate>
  );
}
