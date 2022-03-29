import React, { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useBookStore from '../stores/book';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BookDetail from '../components/bookshelf/BookDetail';

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

  return (
    <>
      <Header>
        <button type="button" onClick={() => navigate(-1)}>
          Back
        </button>
      </Header>
      {book && <BookDetail book={book} />}
      {book.status !== 0 && (
        <Footer>
          <button type="button">책 읽기</button>
        </Footer>
      )}
    </>
  );
}

export default BookshelfBook;
