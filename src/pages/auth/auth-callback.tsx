import { useHandleSignInCallback } from '@logto/react';
import { useState } from 'react';
import { $userPayloadAtom } from '@/atoms/organization';
import { useMount, useUpdateLayoutEffect } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { organizationsByUser } from '@/services/logto/src/organization';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);
  const { isLoading } = useHandleSignInCallback(async () => {
    setInitialized(true);
  });
  useMount(() => {
    setTimeout(() => {
      if (location.pathname.startsWith('/callback')) {
        navigate('/auth');
      }
    }, 3000);
  });
  useUpdateLayoutEffect(() => {
    if (!isLoading && initialized) {
      organizationsByUser().then((res) => {
        if (res.data.length) {
          $userPayloadAtom.set({
            ...$userPayloadAtom.get(),
            organizations: res.data,
          });
        }
        navigate('/conn');
      });
    }
  }, [isLoading, initialized]);
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">sign in success</h1>
        <p className="text-gray-500 mt-2">redirecting...</p>
      </div>
    </div>
  );
}
