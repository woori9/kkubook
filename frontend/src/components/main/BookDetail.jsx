import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'twin.macro';
import { getBookDetail, getNaverUrl } from '../../api/main';
import useStore from '../../stores/user';
import { addBook } from '../../api/bookshelf';
import useBookStore from '../../stores/book';

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

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 2rem;
  padding: 2rem;
  padding-top: 5rem;
  padding-bottom: 5rem;

  .book-title {
    margin-bottom: 1rem;
    font-size: 22px;
    align-self: center;
  }
  .book-img {
    width: 128px;
    align-self: center;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  .content-title {
    font-size: 18px;
  }
  .content {
    color: #a1a1a1;
    margin-bottom: 1.5rem;
  }
`;

function Content({ title, content }) {
  return (
    <div>
      <p className="content-title">{title}</p>
      <p className="content">{content}</p>
    </div>
  );
}

const Buttons = styled.div`
  position: fixed;
  width: 100%;
  max-width: 500px;
  bottom: 0;
  margin-bottom: 1rem;
  display: flex;
`;

const Button = styled.button`
  width: 100%;
  height: 3rem;
  margin: 0 0.5rem 0 0.5rem;
  cursor: pointer;
  color: ${props => (props.left ? '#61B864' : '#ffffff')};
  border: ${props => (props.left ? '1px solid #61B864' : 'none')};
  border-radius: 10px;
  background-color: ${props => (props.left ? '#ffffff' : '#8DCD84')};
`;

function BookDetail() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const userId = useStore(state => state.userInfo.userId);
  const setCategory = useBookStore(state => state.setCategory);
  const [isbn, getIsbn] = useState('');
  const [title, getTitle] = useState('');
  const [description, getDescription] = useState('');
  const [author, getAuthor] = useState('');
  const [publisher, getPublisher] = useState('');
  const [imgUrl, getImgUrl] = useState('');
  const [page, getPage] = useState('');
  const [naverUrl, getUrl] = useState('');

  function openPortalDetail() {
    window.open(`${naverUrl}`, '_blank');
  }

  useEffect(() => {
    getBookDetail(
      bookId,
      response => {
        const { isbn, title, description, author, publisher, img_url, page } =
          response.data;
        getIsbn(isbn);
        getTitle(title);
        getDescription(description);
        getAuthor(author);
        getPublisher(publisher);
        getImgUrl(img_url);
        getPage(page);
        getNaverUrl(
          { isbn: `${isbn}` },
          response => getUrl(response.data.link),
          error => console.log(error),
        );
      },
      error => console.log(error),
    );
  }, []);

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
        <p>책 검색하기</p>
      </Bar>
      <BookInfo>
        <p className="book-title">{title}</p>
        <img className="book-img" src={imgUrl} alt={title} />
        <Content title="책 소개" content={description} />
        <Content title="출판사" content={publisher} />
        <Content title="페이지" content={page} />
      </BookInfo>
      <Buttons>
        <Button left onClick={() => openPortalDetail()}>
          <p>책 상세내용 보기</p>
        </Button>
        <Button
          onClick={() => {
            addBook(Number(bookId), userId);
            setCategory(2);
            navigate('/bookshelf');
          }}
        >
          <p>서재에 등록하기</p>
        </Button>
      </Buttons>
    </>
  );
}

export default BookDetail;
