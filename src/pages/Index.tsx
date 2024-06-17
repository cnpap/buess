import { useNavigate } from 'react-router-dom';
import { useMount } from 'ahooks';

function Index() {
  const navigate = useNavigate();
  useMount(() => {
    navigate('/auth/sign-in');
  });
  return <div></div>;
}

export default Index;
