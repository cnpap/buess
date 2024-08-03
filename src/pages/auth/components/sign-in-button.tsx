import { SignIn } from '@clerk/clerk-react';
import React from 'react';
import { cn } from '$lib/utils';

function SignInButton() {
  return (
    <div className={cn('transition fade-in duration-1000 mt-12 ease-in-out min-h-[300px]')}>
      <SignIn />
    </div>
    // <button onClick={handleSignIn} className="p-[3px] relative">
    //   <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
    //   <div
    //     className="px-8 py-2  bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
    //     To sign in page
    //   </div>
    // </button>
  );
}

export default SignInButton;
