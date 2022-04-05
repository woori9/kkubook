import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'twin.macro';
import Navbar from '../components/common/Navbar';
import FabButton from '../components/common/FabButton';
import MemoContainer from '../components/memo/MemoContainer';
import { apiGetMemos } from '../api/memo';
import backKkubook from '../assets/back-kkubook.png';

const MemoRoot = styled.div`
  padding: 1rem;
  padding-top: 4rem;
  padding-bottom: 5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
  .header {
    font-size: 30px;
    font-weight: bold;
  }
  #search-icon {
    width: 30px;
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .form-check {
    display: flex;
    justify-content: end;
    align-items: center;
    cursor: pointer;
    margin-bottom: 1.5rem;
    .check-label {
      padding-left: 5px;
    }
    #checkbox {
      background-color: #8dcd84;
      border-radius: 3px;
    }
  }
`;

const CheckMark = styled.div`
  border: ${props => (props.checked ? '' : '1px solid #848282')};
  border-radius: 3px;
  width: 20px;
  height: 20px;
}
`;

const NoMemo = styled.div`
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;

  img {
    display: block;
    width: 4.5rem;
    height: auto;
    margin-bottom: 1rem;
  }
`;

function Memo() {
  const navigate = useNavigate();
  const [likedMemos, setLikedMemos] = useState(false);
  const [memos, setMemos] = useState([]);
  const [isEmpty, setEmpty] = useState(false);

  async function getMemos() {
    const resData = await apiGetMemos();
    setMemos(resData);
    if (resData.length === 0) {
      setEmpty(true);
    }
  }

  async function getLikedMemos(likeStatus) {
    const memoList = await apiGetMemos();
    if (likeStatus) {
      const likeStatusMemos = memoList.filter(
        memo => memo.memo_mark === likeStatus,
      );
      return setMemos(likeStatusMemos);
    }
    return setMemos(memoList);
  }
  useEffect(() => {
    getMemos();
  }, []);

  return (
    <>
      <Navbar />
      <FabButton />
      <MemoRoot>
        <Header>
          <p className="header">메모</p>
          <svg
            id="search-icon"
            width="50"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="#848282"
            onClick={() => navigate('/searchmemo')}
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </Header>
        <Container>
          <div
            className="form-check"
            role="button"
            onClick={() => {
              setLikedMemos(!likedMemos);
              getLikedMemos(!likedMemos);
            }}
            onKeyDown={() => ''}
            tabIndex={0}
          >
            {likedMemos ? (
              <CheckMark checked>
                <svg
                  id="checkbox"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </CheckMark>
            ) : (
              <CheckMark />
            )}
            <p className="check-label">좋아하는 메모</p>
          </div>
          {isEmpty ? (
            <NoMemo>
              <img src={backKkubook} alt="back of kkubook character" />
              <p>아직 작성한 메모가 없습니다.</p>
            </NoMemo>
          ) : (
            <div>
              {memos.length ? (
                <div>
                  {memos.map(memo => (
                    <MemoContainer key={memo.id} memo={memo} />
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </Container>
      </MemoRoot>
    </>
  );
}

export default Memo;
