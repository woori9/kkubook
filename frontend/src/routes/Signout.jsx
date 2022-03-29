import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import GoBackBar from '../components/common/GoBackBar';
import Navbar from '../components/common/Navbar';
import { signout } from '../api/user';
import useStore from '../stores/user';

const Div = styled.div`
  ${tw`flex flex-col justify-center items-center`}
  height: 100vh;

  h1 {
    margin-bottom: 0.75rem;
  }

  strong {
    color: #ff5858;
    font-weight: 500;
  }
  ul {
    background-color: #f2f2f2;
    padding: 2rem 3rem;
    margin: 2rem 1rem;
    border-radius: 10px;

    li:first-child {
      margin-bottom: 1rem;
    }
  }

  .leaveBtn {
    color: #fff;
    border: 0;
    background-color: #ff5858;
    padding: 12px 32px;
    border-radius: 10px;
  }
`;

function Signout() {
  const setUserInfo = useStore(state => state.setUserInfo);
  const navigate = useNavigate();

  function clickBtn() {
    signout(
      response => {
        console.log(response);
        setUserInfo({});
        navigate('/intro');
      },
      error => {
        console.log(error);
      },
    );
  }

  return (
    <>
      <Navbar />
      <GoBackBar />
      <Div>
        <h1>꾸북 회원 탈퇴</h1>
        <strong>탈퇴하기 전 반드시 확인해주세요.</strong>
        <ul>
          <li>회원 탈퇴 시 계정 정보는 복구 불가능합니다.</li>
          <li>
            재가입 제한은 없으나, 재가입 계정에서 이전 계정에서의 정보는 확인할
            수 없습니다.
          </li>
        </ul>
        <button type="button" className="leaveBtn" onClick={() => clickBtn()}>
          탈퇴하기
        </button>
      </Div>
    </>
  );
}

export default Signout;
