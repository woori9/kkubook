import React, { useState, useCallback } from 'react';
import { styled } from 'twin.macro';
import Navbar from '../components/common/Navbar';
import FabButton from '../components/common/FabButton';
import bookshelfCategories from '../constants/bookShelf';
import BookshelfCategory from '../components/bookshelf/BookshelfCategory';
import useBookStore from '../stores/book';
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
  const [selectedCategory, setSelectedCategory] = useState(
    bookshelfCategories[0],
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
            <Book key={book.id} book={book} />
          ))}
        </ul>
      </BookshelfPage>
      <Navbar />
      <FabButton />
    </>
  );
}

export default BookShelf;
