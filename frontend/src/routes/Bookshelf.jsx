import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'twin.macro';
import Navbar from '../components/common/Navbar';
import FabButton from '../components/common/FabButton';
import bookshelfCategories from '../constants/bookShelf';
import BookshelfCategory from '../components/bookshelf/BookshelfCategory';
import useBookStore, { selectedBookStore } from '../stores/book';
import Book from '../components/bookshelf/Book';

const BookshelfPage = styled.div`
  padding: 0 1rem 4rem;
  margin: 0px auto;

  header {
    font-size: 30px;
    font-weight: bold;
    padding-top: 4rem;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0px;
    padding-top: 30px;
  }

  li {
    list-style-type: none;
  }
`;

function BookShelf() {
  const navigate = useNavigate();
  const selectedCategory = useBookStore(state => state.category);
  const setCategory = useBookStore(state => state.setCategory);
  const getBooklist = useBookStore(state => state.getBooklist);
  const setSelectedBook = selectedBookStore(state => state.setSelectedBook);
  const books = useBookStore(
    useCallback(
      state => {
        return state.bookshelf.filter(
          book => book.bookStatus === selectedCategory,
        );
      },
      [selectedCategory],
    ),
  );

  useEffect(() => {
    getBooklist();
  }, []);

  const selectCategory = category => {
    if (category !== selectedCategory) {
      setCategory(category);
    }
  };

  const selectBook = book => {
    setSelectedBook(book);
    navigate('/bookshelf/book');
  };

  return (
    <>
      <BookshelfPage>
        <header>
          <p>내 서재</p>
        </header>

        <ul>
          {bookshelfCategories.map(category => (
            <BookshelfCategory
              key={category.name}
              category={category}
              isSelected={selectedCategory === category.status}
              handleClick={selectCategory}
            />
          ))}
        </ul>

        <ul>
          {books.map(book => (
            <Book
              key={book.id}
              book={book}
              handleClick={selectBook}
              startedReading={book.bookStatus !== 2}
              finishedReading={book.bookStatus === 0}
            />
          ))}
        </ul>
      </BookshelfPage>
      <Navbar />
      <FabButton />
    </>
  );
}

export default BookShelf;
