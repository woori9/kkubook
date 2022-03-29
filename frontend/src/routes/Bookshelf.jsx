import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'twin.macro';
import Navbar from '../components/common/Navbar';
import FabButton from '../components/common/FabButton';
import bookshelfCategories from '../constants/bookShelf';
import BookshelfCategory from '../components/bookshelf/BookshelfCategory';
import useBookStore from '../stores/book';
import useBookshelfStore from '../stores/bookshelf';
import Book from '../components/bookshelf/Book';

const BookshelfPage = styled.div`
  width: 95%;
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
  const { selectedCategory, setSelectedCategory } = useBookshelfStore(
    state => state,
  );

  const books = useBookStore(
    useCallback(
      state => {
        return state.books.filter(
          book => book.status === selectedCategory.status,
        );
      },
      [selectedCategory],
    ),
  );

  const selectCategory = category => {
    if (category.name !== selectedCategory.name) {
      setSelectedCategory(category);
    }
  };

  const selectBook = bookId => {
    navigate(`/bookshelf/book/${bookId}`);
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
              key={category.status}
              category={category}
              isSelected={selectedCategory.name === category.name}
              handleClick={selectCategory}
            />
          ))}
        </ul>

        <ul>
          {books.map(book => (
            <Book key={book.id} book={book} handleClick={selectBook} />
          ))}
        </ul>
      </BookshelfPage>
      <Navbar />
      <FabButton />
    </>
  );
}

export default BookShelf;
