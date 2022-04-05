import { useCallback } from 'react';
import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import GoBackBar from '../components/common/GoBackBar';
import Navbar from '../components/common/Navbar';
import useStore from '../stores/user';
import { offKkubookMode } from '../api/user';
import useBottomSheetStore from '../stores/bottomSheet';
import NicknameChange from '../components/myinfo/NicknameChange';

const Div = styled.div`
  ${tw`pt-[52px]`}

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

  .stop-btn {
    color: #fff;
    background-color: #ff5858;
    border: 0;
    border-radius: 5px;
    padding: 4px 10px;
    margin: 0.3rem 0;

    &:disabled {
      color: #000;
      background-color: #f2f2f2;
    }
  }

  .non-styled-btn {
    width: 100%;
    text-align: left;
    color: #000;
    font-size: 16px;
    font-family: [ 'NanumSquare', sans-serif];
    border: 0;
    background-color: transparent;
    padding: 0;
  }

  li:last-child {
    text-align: right;
  }

  .leave-btn {
    color: #a1a1a1;
    border: 0;
    background-color: transparent;
    padding: 0;
  }
`;

function Settings() {
  const { deleteUserInfo, offKkubook } = useStore();
  const { isKkubook } = useStore(state => state.userInfo);
  const openBottomSheet = useBottomSheetStore(
    useCallback(state => state.openSheet),
  );
  const navigate = useNavigate();

  function changeNickname() {
    openBottomSheet(NicknameChange, '닉네임 변경하기');
  }

  function stopKkubookMode() {
    offKkubookMode(
      () => offKkubook(),
      error => console.log(error),
    );
  }

  function logout() {
    deleteUserInfo();
    navigate('/intro');
  }

  return (
    <>
      <GoBackBar title="설정" />
      <Navbar />
      <Div>
        <hr />
        <Ul>
          <li className="kkubookSetting">
            꾸북 모드
            <button
              type="button"
              className="stop-btn"
              disabled={!isKkubook}
              onClick={() => stopKkubookMode()}
            >
              그만하기
            </button>
          </li>
          <hr />
          <li>
            <button
              type="button"
              className="non-styled-btn"
              onClick={() => changeNickname()}
            >
              닉네임 변경
            </button>
          </li>
          <hr />
          <li>
            <button
              type="button"
              className="non-styled-btn"
              onClick={() => logout()}
            >
              로그아웃
            </button>
          </li>
          <hr />
          <li>
            <button
              type="button"
              className="leave-btn"
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
