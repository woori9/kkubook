import tw, { styled } from 'twin.macro';
import StarRatings from 'react-star-ratings';
import Period from './Period';
import Memo from './Memo';
import mock_memos from '../../data/memos';

const BookDetailPage = styled.div`
  padding: 3rem 10px 0px;
  margin: 0px auto;
  text-align: center;
  min-height: 110vh;

  img {
    height: 30%;
    width: 50%;
    margin: 20px auto;
  }

  .title {
    font-size: 25px;
    word-break: break-all;
  }

  .subject {
    margin: 15px auto;
    text-align: left;
  }

  .tag {
    ${tw`bg-main-green`}
    display: inline-block;
    padding: 8px;
    margin: 0px auto;
    border-radius: 50px;
    font-size: 12px;
  }
`;

function BookDetail({ book }) {
  return (
    <BookDetailPage>
      <p className="title">{book.title}</p>
      <img src={book.image} alt={book.title} />
      <p>{book.author}</p>
      {book.status === 0 && (
        <StarRatings
          rating={book.rating / 2}
          starRatedColor="orange"
          starEmptyColor="gray"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="0px"
        />
      )}
      <br />
      <p className="tag">선택된 카테고리</p>
      {book.status !== 2 && (
        <Period
          startFrom={book.startFrom}
          end={book.end}
          status={book.status}
          page={book.page}
          totalPage={book.totalPage}
        />
      )}
      <p className="subject">내 메모</p>
      {mock_memos.map(memo => (
        <Memo key={memo.id} memo={memo} />
      ))}
    </BookDetailPage>
  );
}

export default BookDetail;
