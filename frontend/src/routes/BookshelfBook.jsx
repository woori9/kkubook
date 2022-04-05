import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BookDetail from '../components/bookshelf/BookDetail';
import Button from '../components/common/Button';
import Warning from '../components/bookshelf/Warning';
import Memo from '../components/bookshelf/Memo';
import useBottomSheetStore from '../stores/bottomSheet';
import useUserStore from '../stores/user';
import { selectedBookStore } from '../stores/book';
import { startReading, deleteBook } from '../api/bookshelf';

const StyledBookshelf = styled.div`
  padding: 4rem 1rem;
  margin: 0px auto;
  text-align: center;

  img {
    height: 30%;
    width: 50%;
    margin: 20px auto;
  }

  .subject {
    margin: 15px 0px;
    text-align: left;
  }

  .memo-title {
    display: flex;
    align-items: center;
  }

  .memo-button {
    ${tw`text-dark-green`}
    margin-left: auto;
    height: 20px;
    border: none;
    outline: none;
    background-color: #fff;
  }
`;

function BookshelfBook() {
  const navigate = useNavigate();
  const book = selectedBookStore(useCallback(state => state.selectedBook, []));
  const userId = useUserStore(state => state.userInfo.userId);
  const memos = selectedBookStore(
    useCallback(
      state => state.memos.filter(memo => memo.bookInfo.id === book.bookId),
      [],
    ),
  );
  const getMemos = selectedBookStore(state => state.getMemos);

  useEffect(() => {
    if (!book) {
      navigate('/');
    } else {
      getMemos();
    }
  }, []);

  const moveToReading = () => {
    navigate('/reading');
  };

  const getButtonByStatus = {
    1: <Button title="읽기" width="90%" onClick={moveToReading} />,
    2: (
      <Button
        title="읽기 시작"
        width="90%"
        onClick={() => {
          startReading(book.id, book.bookId, userId, book.bookStatus);
          moveToReading();
        }}
      />
    ),
    3: (
      <Button
        title="읽기"
        width="90%"
        onClick={() => {
          startReading(book.id, book.bookId, userId, book.bookStatus);
          moveToReading();
        }}
      />
    ),
  };

  const openBottomSheet = useBottomSheetStore(
    useCallback(state => state.openSheet),
  );
  const warningDelete = useCallback(
    () => <Warning status={book.bookStatus} />,
    [],
  );

  const getHeaderButton = status => {
    if (status === 2 || status === 3) {
      return (
        <Button
          title="삭제"
          background="transparent"
          color="gray"
          width="initial"
          size="15px"
          padding="14px"
          onClick={() =>
            openBottomSheet(warningDelete, '책을 삭제하시겠습니까?', () =>
              deleteBook(book.id),
            )
          }
        />
      );
    }

    return null;
  };

  if (book) {
    return (
      <>
        <Header>{getHeaderButton(book.bookStatus)}</Header>
        <StyledBookshelf>
          <BookDetail
            book={book}
            finishedReading={book.bookStatus === 0}
            startedReading={book.bookStatus !== 2}
            isReading={book.bookStatus === 1}
          />
          <div className="memo-title">
            <p className="subject">내 메모</p>
            <button
              type="button"
              className="subject memo-button"
              onClick={() => navigate('/creatememo')}
            >
              메모 작성
            </button>
          </div>
          {memos.map(memo => (
            <Memo key={memo.id} memo={memo} navigate={navigate} />
          ))}
        </StyledBookshelf>
        {book.bookStatus !== 0 && (
          <Footer>{getButtonByStatus[book.bookStatus]}</Footer>
        )}
      </>
    );
  }

  return null;
}

export default BookshelfBook;
