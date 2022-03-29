import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import GoBackBar from '../components/common/GoBackBar';
import Navbar from '../components/common/Navbar';

const Div = styled.div`
  ${tw`mt-[52px]`}

  hr {
    height: 1px;
    background-color: #848282;
    border: 0;
  }
`;

const Ul = styled.ul`
  ${tw`list-none pl-0`}

  hr {
    background-color: #a1a1a1;
  }

  li {
    line-height: 2.5;
    margin: 0 1rem;
  }

  .kkubookSetting {
    display: flex;
    justify-content: space-between;
  }

  .stopBtn {
    // background-color: #ff5858;
    // color: white;
    border: 0;
    border-radius: 5px;
    margin: 0.3rem 0;
  }

  li:last-child {
    text-align: right;
  }

  .leaveBtn {
    color: #a1a1a1;
    border: 0;
    background-color: transparent;
  }
`;

function Settings() {
  const navigate = useNavigate();

  return (
    <>
      <GoBackBar title="설정" />
      <Navbar />
      <Div>
        <hr noshade />
        <Ul>
          <li className="kkubookSetting">
            꾸북 모드
            <button type="button" className="stopBtn">
              그만하기
            </button>
          </li>
          <hr noshade />
          <li>닉네임 변경</li>
          <hr noshade />
          <li>로그아웃</li>
          <hr noshade />
          <li>
            <button
              type="button"
              className="leaveBtn"
              onClick={() => navigate('/myinfo/settings/signout')}
            >
              탈퇴하기
            </button>
          </li>
        </Ul>
      </Div>
    </>
  );
}

export default Settings;
