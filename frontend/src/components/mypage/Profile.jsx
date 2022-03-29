import tw, { styled } from 'twin.macro';
import ProgressBar from '../common/ProgressBar';
import Svg from '../common/Svg';

const ProfileBox = styled.div`
  ${tw`px-page-x pb-8`}
  box-shadow: 0 15px 15px -15px rgb(0 0 0 / 0.1);
`;

const ProfileTitle = styled.div`
  ${tw`flex justify-between items-center mb-3`}

  .profile-info {
    display: flex;
    align-items: center;
  }

  h1 {
    font-size: 24px;
    margin-right: 8px;
  }

  .setting-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const InfoText = styled.p`
  ${tw`text-main-gray text-sm`}
`;

const Ol = styled.ol`
  ${tw`list-none flex justify-between pl-0`}
`;

function Profile({ userInfo }) {
  const { nickname, isKkubook, kkubookComplete, level, kkubookDays } = userInfo;
  return (
    <ProfileBox>
      <ProfileTitle>
        <div className="profile-info">
          <h1>{nickname}님</h1>
          {kkubookComplete > 0 && (
            <>
              <Svg viewBox="0 0 15 14">
                <rect
                  x="6.18665"
                  y="6.42578"
                  width="3.90477"
                  height="6.34524"
                  transform="rotate(-26.0713 6.18665 6.42578)"
                  fill="#F8E480"
                />
                <path
                  d="M9.93131 9.75149L12.4113 10.4921L8.99407 12.164L9.93131 9.75149Z"
                  fill="white"
                />
                <rect
                  x="3.30157"
                  y="4.74316"
                  width="3.90477"
                  height="6.34524"
                  transform="rotate(25.8141 3.30157 4.74316)"
                  fill="#F8E480"
                />
                <path
                  d="M2.9963 9.74258L3.94435 12.1509L0.519652 10.4943L2.9963 9.74258Z"
                  fill="white"
                />
                <circle cx="6.46728" cy="4.02679" r="4.02679" fill="#FFBF5F" />
              </Svg>
              <InfoText>꾸북 챌린지 {kkubookComplete}회 성공</InfoText>
            </>
          )}
        </div>
        <button type="button" className="setting-btn">
          <Svg stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </Svg>
        </button>
      </ProfileTitle>
      {/* TODO: 아래 조건 not 떼기 */}
      {!isKkubook ? (
        <>
          <strong>꾸북모드 시작한지 {level * 10 + kkubookDays}일째</strong>
          <ProgressBar
            value={kkubookDays}
            totalValue={10}
            height="15px"
            needBalloon
          />
          <Ol>
            <li>lv {level}</li>
            <li>lv {level + 1}</li>
          </Ol>
        </>
      ) : (
        <InfoText>꾸북 모드를 켜서 독서 습관 만들기를 시작해보세요!</InfoText>
      )}
    </ProfileBox>
  );
}

export default Profile;
