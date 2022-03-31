import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import Time from './Time';
import useStore from '../../stores/bottomSheet';
import PageInput from './PageInput';
import GiveUpReading from './GiveupReading';
import Header from '../common/Header';

const StyledRecordPage = styled.div`
  width: 100%;
  padding: 10rem 1rem;

  .content {
    margin: 0px auto;
    position: relative;
  }

  .record-box {
    display: flex;
    align-items: center;
    height: 6rem;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0px 2px 5px 1px gray;
    width: 100%;
    margin: 30px auto;
  }

  .record {
    margin: 10px;
    text-align: left;
  }

  .title {
    font-size: 12px;
    margin-bottom: 5px;
  }

  .page {
    font-size: 20px;
  }

  .save-button {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 90%;
    height: 3rem;
    bottom: 15px;
    border-radius: 10px;
    ${tw`bg-main-green`}
  }
`;

function RecordPage({ time, setIsCurrentPage }) {
  const openBottomSheet = useStore(state => state.openSheet);
  const totalPage = 100;
  const initialPage = 1;
  const [page, setPage] = useState(initialPage);
  const submitPage = submittedPage => {
    if (submittedPage === 'done') {
      setPage(totalPage);
      return;
    }

    if (submittedPage === 'stop') {
      openBottomSheet(GiveUpReading, '이번 책이 힘드셨나요?');
      return;
    }

    // 차후 값이 valid 한지 확인하는 로직 추가
    setPage(Number(submittedPage));
  };

  useEffect(() => {
    openBottomSheet(PageInput, '페이지 기록하기', submitPage);
  }, []);

  return (
    <>
      <Header
        title="오늘의 독서기록"
        backClickHandler={() => setIsCurrentPage('reading')}
      />
      <StyledRecordPage>
        <div className="content">
          <button type="button" className="record-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width="55px"
              height="55px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="record">
              <p className="title">읽은 시간</p>
              <Time time={time} />
            </div>
          </button>

          <button
            type="button"
            className="record-box"
            onClick={() =>
              openBottomSheet(PageInput, '페이지 기록하기', submitPage)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width="55px"
              height="55px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <div className="record">
              <p className="title">읽은 페이지</p>
              <p>
                <span className="page">P. {page}</span> / {totalPage}
              </p>
            </div>
          </button>
        </div>
        <button type="button" className="save-button">
          저장하기
        </button>
      </StyledRecordPage>
    </>
  );
}

export default RecordPage;
