import { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';

const BookContainer = styled.div`
  cursor: pointer;
  margin-right: 1rem;
  .book-img {
    margin-bottom: 1rem;
    min-height: 20vh;
    display: flex;
    align-items: end;
    img {
      width: 100%;
      max-height: 100%;
    }
  }
  .book-info {
    .book-title {
      font-size: 18px;
      padding-bottom: 0.5rem;
    }
    .book-author {
      font-size: 16px;
      color: #848282;
    }
  }
`;

function SearchResult({ book }) {
  const { id, title, author, img_url } = book;
  const navigate = useNavigate();

  return (
    <BookContainer onClick={() => navigate(`/bookDetail/${id}`)}>
      <div className="book-img">
        <img src={img_url} alt={title} />
      </div>
      <div className="book-info">
        <p className="book-title">{title}</p>
        <p className="book-author">{author}</p>
      </div>
    </BookContainer>
  );
}

export default SearchResult;
