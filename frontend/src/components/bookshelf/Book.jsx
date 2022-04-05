import React from 'react';
import tw, { styled } from 'twin.macro';
import { Rating } from 'react-simple-star-rating';
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
function Book({ book, handleClick, startedReading, finishedReading }) {
  const { bookInfo } = book;

  return (
    <StyledBook onClick={() => handleClick(book)}>
      <img src={bookInfo.img_url} alt={bookInfo.title} />
      <div className="description">
        <p className="title">{bookInfo.title}</p>
        <p className="author">{bookInfo.author}</p>
        {finishedReading && (
          <Rating readonly ratingValue={book.rating * 10} size={22} />
        )}
        {startedReading && (
          <Pregress
            startDate={book.startDate}
            endDate={book.endDate}
            currPage={book.currPage}
            totalPage={bookInfo.page}
            isReading={book.bookStatus === 1}
          />
        )}
      </div>
    </StyledBook>
  );
}
export default Book;
