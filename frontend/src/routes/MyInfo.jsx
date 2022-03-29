import tw, { styled } from 'twin.macro';
import Navbar from '../components/common/Navbar';
import FabButton from '../components/common/FabButton';
import useStore from '../stores/user';
import Profile from '../components/mypage/Profile';
import Statistics from '../components/mypage/Statistics';

function MyInfo() {
  const userInfo = useStore(state => state.userInfo);
  return (
    <>
      <Navbar />
      <FabButton />
      <Profile userInfo={userInfo} />
      <Statistics createdAt={userInfo.createdAt} />
    </>
  );
}

export default MyInfo;
