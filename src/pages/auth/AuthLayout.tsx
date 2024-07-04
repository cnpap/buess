import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLogto } from '@logto/react';
import { useMount } from 'ahooks';
import { VITE_BASE_URL } from '@/const';

export default function AuthLayout() {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, getIdTokenClaims } = useLogto();
  useMount(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then((claims) => {
        localStorage.setItem('u', JSON.stringify(claims));
        navigate('/main');
      });
    }
  });

  // noinspection HtmlUnknownTarget
  return (
    <div
      className="
      w-full absolute inset-0 z-0 h-full bg-white dark:bg-[#090909]
      bg-[linear-gradient(to_right,#f9f9f9_1px,transparent_1px),linear-gradient(to_bottom,#f9f9f9_1px,transparent_1px)] bg-[size:10rem_10rem]
      dark:bg-[linear-gradient(to_right,#090909_1px,transparent_1px),linear-gradient(to_bottom,#090909_1px,transparent_1px)]
      [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)
      "
    >
      {/*绝对定位，绝对居中*/}
      <div className="absolute inset-0 flex items-center justify-center z-10 min-w-[40rem]">
        <Button onClick={() => signIn(`${VITE_BASE_URL}/callback`)}>To sign in page</Button>
      </div>
      <div
        className="
      hidden lg:block
      "
      >
        <img src="/auth/background.png" alt="Image" className="h-screen w-screen" />
      </div>
    </div>
  );
}
