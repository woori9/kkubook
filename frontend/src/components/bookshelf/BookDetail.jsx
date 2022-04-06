import tw, { styled } from 'twin.macro';
import { Rating } from 'react-simple-star-rating';
import Pregress from './Progress';
import bookshelfCategories from '../../constants/bookShelf';

const BookDetailPage = styled.div`
  .title {
    font-size: 25px;
    word-break: break-all;
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

function BookDetail({ book, finishedReading, startedReading, isReading }) {
  const { bookInfo } = book;
  return (
    <BookDetailPage>
      <p className="title">{bookInfo.title}</p>
      <img src={bookInfo.img_url} alt={bookInfo.title} />
      <p>{bookInfo.author}</p>
      {finishedReading && (
        <Rating readonly ratingValue={book.rating * 10} size={25} />
      )}
      <br />
      <p className="tag">
        {book.bookStatus
          ? bookshelfCategories[book.bookStatus].name
          : '다 읽은 책'}
      </p>
      {startedReading && (
        <>
          <p className="subject">독서기간</p>
          <Pregress
            startDate={book.startDate}
            endDate={book.endDate}
            currPage={book.currPage}
            totalPage={bookInfo.page}
            isReading={isReading}
            padding="10px 5px 5px"
          />
        </>
      )}
    </BookDetailPage>
  );
}

export default BookDetail;
