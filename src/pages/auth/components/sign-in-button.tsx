import { VITE_BASE_URL } from '@/const';
import { useLogto } from '@logto/react';

function SignInButton() {
  const { signIn } = useLogto();

  return (
    <button onClick={() => signIn(`${VITE_BASE_URL}/callback`)} className="p-[3px] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
      <div className="px-8 py-2  bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
        To sign in page
      </div>
    </button>
  );
}

export default SignInButton;
