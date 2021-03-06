import PropTypes from 'prop-types';
import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../common/ProgressBar';

const BookContainer = styled.div`
  ${tw`text-dark-gray`}
  width: 100%;

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #1f1f1f;
    font-weight: bold;
    font-size: 20px;
    padding-bottom: 5px;
  }
  .author {
    font-size: 15px;
  }

  .contents {
    margin: 10px auto;
    display: flex;
    width: 100%;
  }

  .start-date {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .progress {
    margin-top: auto;
    margin-left: 10px;
    width: 100%;
  }

  img {
    display: block;
    width: 30%;
    height: 16vh;
    margin-bottom: auto;
  }

  .buttons {
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: flex;
    width: 100%;
    border-radius: 0px 0px 30px 30px;
    ${tw`bg-light-gray`}
  }

  button {
    height: 30px;
    border: none;
    outline: none;
    width: 100%;
  }

  .br-left-bottom {
    border-radius: 0px 0px 0px 30px;
  }

  .br-right-bottom {
    border-radius: 0px 0px 30px 0px;
  }

  .button-title {
    display: inline-block;
    margin-left: 3px;
    color: #000;
  }

  .v-line {
    border-left: 1px solid #d4d4d4;
  }

  .page-info {
    margin-top: 4px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
  .button-element {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function MainBook({ book, index, selectBook, setCardIndex }) {
  const { id, bookId, currPage, startDate, bookInfo } = book;
  const navigate = useNavigate();

  return (
    <BookContainer>
      <p className="title">{bookInfo.title}</p>
      <p className="author">{bookInfo.author}</p>
      <div className="contents">
        <img src={bookInfo.img_url} alt={bookInfo.title} />
        <div className="progress">
          <div className="progress-items">
            <p className="start-date">시작일 {startDate}</p>
            <ProgressBar value={currPage} totalValue={bookInfo.page} />
            <div className="page-info">
              <p>{Math.round((currPage / bookInfo.page) * 100)}%</p>
              <p>
                {currPage} / {bookInfo.page} 페이지
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button
          className="br-left-bottom"
          type="button"
          onClick={() => {
            setCardIndex(index + 1);
            selectBook(book);
            navigate('/reading');
          }}
        >
          <div className="button-element">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width={20}
              height={20}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="button-title">책 읽기</p>
          </div>
        </button>
        <button
          className="br-right-bottom v-line"
          type="button"
          onClick={() => {
            setCardIndex(index + 1);
            selectBook(book);
            navigate('/creatememo', {
              state: { id: `${bookId}`, title: `${bookInfo.title}` },
            });
          }}
        >
          <div className="button-element">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width={20}
              height={20}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <p className="button-title">메모하기</p>
          </div>
        </button>
      </div>
    </BookContainer>
  );
}

MainBook.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    image: PropTypes.string,
    startFrom: PropTypes.string,
    totalPage: PropTypes.number,
    page: PropTypes.number,
    status: PropTypes.number,
  }).isRequired,
};

export default MainBook;
