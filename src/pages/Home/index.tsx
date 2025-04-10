import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/reducer';

const Home: React.FC = () => {
  const userinfo = useSelector((state: RootState) => state.userinfo);
  console.log(userinfo, 'userinfo');

  return <div>121312313</div>;
};

export default Home;
