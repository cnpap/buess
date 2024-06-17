import { useNavigate } from 'react-router-dom';
import { useMount } from 'ahooks';

function Home() {
  const navigate = useNavigate();
  useMount(() => {
    navigate('/auth/sign-in');
  });
  return <div></div>;
}

export default Home;
