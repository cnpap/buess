import { useHandleSignInCallback } from '@logto/react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { isLoading } = useHandleSignInCallback(() => {
    navigate('/main');
  });
  if (!isLoading) {
    return null;
  }
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">sign in success</h1>
        <p className="text-gray-500 mt-2">redirecting...</p>
      </div>
    </div>
  );
}
