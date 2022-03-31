import React from 'react';
import tw, { styled } from 'twin.macro';
import StarRatings from 'react-star-ratings';
import Pregress from './Progress';

const StyledBook = styled.li`
  width: 100%;
  height: 100px;
  margin: 10px auto;
  border-radius: 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  box-shadow: 0px 0px 6px rgba(1, 1, 1, 0.2);
  ${tw`
  bg-light-gray
  `}
  img {
    width: 60px;
    height: 90px;
    margin-left: 10px;
  }
  .description {
    margin: 0 12px;
    overflow: hidden;
    width: 100%;
  }
  .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    margin: 5px auto;
  }
  .author {
    margin: 5px auto;
  }
  .date {
    font-size: 10px;
  }
  span {
    font-weight: bold;
    margin-right: 2px;
  }
  .progress-rate {
    margin: 5px auto;
    font-size: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
function Book({ book, handleClick }) {
  return (
    <StyledBook onClick={() => handleClick(book.id)}>
      <img src={book.image} alt={book.title} />
      <div className="description">
        <p className="title">{book.title}</p>
        <p className="author">{book.author}</p>
        {book.status === 0 && (
          <StarRatings
            rating={book.rating / 2}
            starRatedColor="orange"
            starEmptyColor="gray"
            numberOfStars={5}
            starDimension="18px"
            starSpacing="0px"
          />
        )}
        {book.status !== 2 && (
          <Pregress
            startFrom={book.startFrom}
            end={book.end}
            status={book.status}
            page={book.page}
            totalPage={book.totalPage}
          />
        )}
      </div>
    </StyledBook>
  );
}
export default Book;
