import React from 'react';
import tw, { styled } from 'twin.macro';

const StyledBook = styled.li`
  background-color: azure;
  width: 100%;
  height: 100px;
  margin: 10px auto;
  border-radius: 10px;
  display: flex;
  align-items: center;
  font-size: 15px;
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
  }

  p {
    margin: 5px auto;
  }

  .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 18px;
  }

  .date {
    font-size: 10px;
  }

  span {
    font-weight: bold;
    margin-right: 2px;
  }
`;

function Book({ book }) {
  return (
    <StyledBook>
      <img src={book.image} alt={book.title} />
      <div className="description">
        <p className="title">{book.title}</p>
        <p>{book.author}</p>
        <p>별 {book.rating}</p>
        <p className="date">
          <span>시작일</span>
          {book.startFrom}
          {'\u00A0 \u00A0 \u00A0 \u00A0'}
          <span>종료일</span>
          {book.end}
        </p>
      </div>
    </StyledBook>
  );
}

export default Book;
