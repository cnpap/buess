import { useNavigate } from 'react-router-dom';
import { useUpdateEffect } from 'ahooks';
import { useAuth } from '@clerk/clerk-react';

function Index() {
  const navigate = useNavigate();
  const auth = useAuth();
  useUpdateEffect(() => {
    if (auth.isLoaded) {
      if (location.pathname === '/') {
        if (auth.isSignedIn) {
          navigate('/conn');
        } else {
          navigate('/auth');
        }
      }
    }
  }, [auth.isLoaded, auth.isSignedIn]);
  return <div></div>;
}

export default Index;
