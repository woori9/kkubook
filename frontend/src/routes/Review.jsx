import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Rating } from 'react-simple-star-rating';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import Button from '../components/common/Button';
import { selectedBookStore } from '../stores/book';
import { submitRating } from '../api/main';

const ReviewPage = styled.div`
  padding: 0 1rem;
  font-size: 20px;
  img {
    width: 40%;
    height: 60%;
  }

  .book-title {
    font-size: 1rem;
    margin: 1rem;
  }

  .content {
    ${tw`bg-light-gray`}
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    border-radius: 10px;
    box-shadow: 2px 1px 10px 1px rgba(0, 0, 0, 0.1);
    position: relative;
    top: 15vh;
  }

  .num-rating {
    margin: 5px auto 40px;
    color: #f1a545;
  }

  .top-1rem {
    top: 1rem;
  }

  .title {
    padding-top: 1rem;
  }
`;

function Review() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const changeRating = value => setRating(value);
  const selectedBook = selectedBookStore(state => state.selectedBook);
  const { id, bookInfo } = selectedBook;
  const [numOfPieces, setNumOfPieces] = useState(200);
  const { innerWidth, innerHeight } = window;
  const width = innerWidth <= 500 ? innerWidth : 500;

  useEffect(
    () =>
      setTimeout(() => {
        setNumOfPieces(0);
      }, 2500),
    [],
  );

  return (
    <>
      <Confetti
        width={width}
        height={innerHeight}
        numberOfPieces={numOfPieces}
      />
      <ReviewPage>
        <p className="title">다 읽었어요!</p>
        <div className="content">
          <img src={bookInfo.img_url} alt={bookInfo.title} />
          <p className="book-title">{bookInfo.title}</p>
          <Rating
            onClick={changeRating}
            ratingValue={rating}
            size={30}
            allowHalfIcon
          />
          <p className="num-rating">{rating / 10}</p>
          <Button
            title="독서 완료"
            background="white"
            color="#8DCD84"
            onClick={() => {
              submitRating(id, rating / 10);
              navigate('/bookshelf');
            }}
          />
          <Button
            title="다음에 읽을 책 추천 받기"
            onClick={() => {
              submitRating(id, rating / 10);
              navigate('/recommendation');
            }}
          />
        </div>
      </ReviewPage>
    </>
  );
}

export default Review;
