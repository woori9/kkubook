import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import Time from './Time';
import Book from './Book';
import useStore from '../../stores/bottomSheet';
import Warning from './Warning';
import Header from '../common/Header';

const StyledReadingPage = styled.div`
  background-color: #2a4753;
  min-height: 100vh;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;

  .time-container {
    width: 100%;
    margin: 0px auto;
    min-height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${tw`text-light-gray`}
    font-weight: lighter;
    font-size: 25px;
  }

  .button-container {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }

  .w-45p {
    width: 47%;
  }

  .p-4p {
    padding: 4%;
  }

  .bg-main-green {
    ${tw`bg-main-green`}
  }

  .bg-light-gray {
    ${tw`bg-light-gray`}
  }

  .br-10 {
    border-radius: 10px;
  }
`;

function ReadingPage({
  time,
  isTimerActive,
  setIsTimerActive,
  isTimeVisible,
  book,
  setCurrentPage,
}) {
  const openBottomSheet = useStore(useCallback(state => state.openSheet));
  const navigate = useNavigate();
  const finishReading = () => {
    setIsTimerActive(false);

    if (time < 120) {
      openBottomSheet(Warning, '독서 시간이 너무 적어요', setCurrentPage);
      return;
    }

    setCurrentPage('record');
  };

  return (
    <>
      <Header background="#2a4753" />
      <StyledReadingPage>
        <div className="time-container">
          <p>{isTimerActive ? '독서 중' : '쉬는 중'}</p>
          {isTimeVisible && <Time time={time} />}
        </div>

        <Book
          bookInfo={book.bookInfo}
          isTimerActive={isTimerActive}
          setIsTimerActive={setIsTimerActive}
        />

        <div className="button-container">
          <button
            type="button"
            className="w-45p p-4p bg-light-gray br-10"
            onClick={() => setCurrentPage('memo')}
          >
            메모하기
          </button>
          <button
            type="button"
            className="w-45p p-4p bg-main-green br-10"
            onClick={finishReading}
          >
            독서완료
          </button>
        </div>
      </StyledReadingPage>
    </>
  );
}

export default ReadingPage;
