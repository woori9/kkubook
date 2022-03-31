import React, { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useBookStore from '../stores/book';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BookDetail from '../components/bookshelf/BookDetail';
import Button from '../components/common/Button';
import useBottomSheetStore from '../stores/bottomSheet';
import Warning from '../components/bookshelf/Warning';

function BookshelfBook() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const book = useBookStore(
    useCallback(
      state => {
        return state.books.find(item => {
          return item.id === Number(bookId);
        });
      },
      [bookId],
    ),
  );

  useEffect(() => {
    if (!book) {
      navigate('/NotFound');
    }
  }, []);

  const moveToReading = () => {
    navigate(`/reading/${bookId}`);
  };

  const getButtonByStatus = {
    1: <Button title="읽기" width="90%" onClick={moveToReading} />,
    2: (
      <Button
        title="읽기 시작"
        width="90%"
        onClick={() => {
          // update book status
          moveToReading();
        }}
      />
    ),
    3: (
      <Button
        title="읽기"
        width="90%"
        onClick={() => {
          // update book status
          moveToReading();
        }}
      />
    ),
  };

  const openBottomSheet = useBottomSheetStore(
    useCallback(state => state.openSheet),
  );
  const warningDelete = useCallback(() => <Warning status={book.status} />, []);
  const deleteBook = useBookStore(state => state.deleteBook);

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
              deleteBook(Number(bookId)),
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
        <Header>{getHeaderButton(book.status)}</Header>
        <BookDetail book={book} />
        {book.status !== 0 && <Footer>{getButtonByStatus[book.status]}</Footer>}
      </>
    );
  }

  return null;
}

export default BookshelfBook;
