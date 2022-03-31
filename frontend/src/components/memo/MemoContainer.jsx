import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'twin.macro';

const Container = styled.div`
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
`;
const MemoInfo = styled.div`
  display: flex;
  .book-info {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    
    .book-info-img {
      margin-right: 10px;
      width: 60px;
      img {
        width: 100%;
      }
    }
    .book-info-text {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .like-button {
    align-self: start;
    cursor: pointer;
    width: 30px;
`;
const MemoContnet = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  .memo-text {
    margin-bottom: 1rem;
    line-height: 1.5rem;
    word-wrap: break-word;
  }
  .memo-img {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
`;

function MemoContainer({ memo }) {
  const navigate = useNavigate();
  const { id, content, memo_img, memo_mark, created_at, title, author, image } =
    memo;
  const [isLiked, setLiked] = useState(memo_mark);

  return (
    <Container>
      <MemoInfo>
        <div className="book-info">
          <div className="book-info-img">
            <img src={image} alt={title} />
          </div>
          <div className="book-info-text">
            <p>{title}</p>
            <p>{author}</p>
            <p>{created_at}</p>
          </div>
        </div>
        {isLiked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 like-button"
            viewBox="0 0 20 20"
            fill="red"
            onClick={() => setLiked(!isLiked)}
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 like-button"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#a1a1a1"
            strokeWidth={2}
            width="24"
            onClick={() => setLiked(!isLiked)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </MemoInfo>
      <MemoContnet
        role="button"
        onClick={() => navigate(`/memo/${id}`, { state: { memo } })}
        onKeyDown={() => ''}
        tabIndex={0}
      >
        <div className="memo-text">
          <p>{content}</p>
        </div>
        {memo_img ? (
          <div className="memo-img">
            <img src={memo_img} alt="memo-img" />
          </div>
        ) : null}
      </MemoContnet>
    </Container>
  );
}
export default MemoContainer;
