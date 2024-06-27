import { useNavigate } from 'react-router-dom';
import { useMount } from 'ahooks';

function Index() {
  const navigate = useNavigate();
  useMount(() => {
    navigate('/auth');
  });
  return <div></div>;
}

export default Index;
