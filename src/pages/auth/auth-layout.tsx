import { useNavigate } from 'react-router-dom';
import { useLogto } from '@logto/react';
import { useMount } from 'ahooks';
import Decorate from '@/components/decorate/decorate';
import SignInButton from '@/pages/auth/components/sign-in-button';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';

const words = [
  {
    text: 'Integrate',
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
  const { isAuthenticated, getIdTokenClaims } = useLogto();
  useMount(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then((claims) => {
        localStorage.setItem('u', JSON.stringify(claims));
        navigate('/conn');
      });
    }
  });

  // noinspection HtmlUnknownTarget
  return (
    <Decorate>
      <div className="flex relative flex-col z-50 items-center justify-center h-screen">
        <TypewriterEffectSmooth width={570} words={words} />
        <SignInButton />
      </div>
    </Decorate>
  );
}
