import { memo } from 'react';
import styled from 'styled-components';

const BookReading = styled.div`
  background-color: white;
  margin: 1rem auto;
  height: 14vh;
  width: 100%;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;

  img {
    height: 100px;
    width: 70px;
    margin: 5px;
  }

  button {
    margin-left: auto;
    height: 100%;
    border-radius: 0px 10px 10px 0px;
  }
`;

function Book({ book, isTimerActive, setIsTimerActive }) {
  return (
    <BookReading>
      <img src={book.image} alt={book.title} />
      <div>
        <p>{book.title}</p>
        <p>{book.author}</p>
      </div>
      <button type="button" onClick={() => setIsTimerActive(!isTimerActive)}>
        {isTimerActive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            width={30}
            height={30}
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            width={30}
            height={30}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </BookReading>
  );
}
export default memo(Book);
