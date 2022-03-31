import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'twin.macro';
import memos from '../../data/memos';
import MemoContainer from './MemoContainer';

const Bar = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  max-width: 500px;
  height: 52px;
  display: flex;
  background-color: white;
  z-index: 3;

  p {
    align-self: center;
    font-size: 17px;
  }
`;
const SearchBox = styled.div`
  padding: 1rem;
  padding-top: 6rem;
  padding-bottom: 3rem;

  .search-bar {
    width: 100%;
    height: 2rem;
    border: 1px solid #848282;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
  }
  input {
    width: 100%;
    border: none;
    outline: none;
  }
  #delete-keyword {
    cursor: pointer;
  }
`;
const MemoList = styled.div`
  padding: 1rem;
`;

function SearchMemo() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  return (
    <>
      <Bar>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          width="29px"
          onClick={() => navigate(-1)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <p>메모 검색</p>
      </Bar>
      <SearchBox>
        <div className="search-bar">
          <svg
            width="50"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="#848282"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            placeholder="메모 내용을 검색해 보세요."
            value={keyword}
            onChange={event => setKeyword(event.target.value)}
          />
          <svg
            id="delete-keyword"
            width="50"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="#848282"
            onClick={() => setKeyword('')}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </SearchBox>
      <MemoList>
        {memos.map(memo => (
          <MemoContainer key={memo.id} memo={memo} />
        ))}
      </MemoList>
    </>
  );
}

export default SearchMemo;
