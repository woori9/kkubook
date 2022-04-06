import { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';

const BookContainer = styled.div`
  display: flex;
  min-height: 105px;
  margin: 1rem;
  cursor: pointer;

  img {
    width: 65px;
    position: absolute;
    margin-left: 1rem;
  }

  .book-info {
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
    padding: 0.5rem 0.5rem 0.5rem 100px;
    background-color: #f2f2f2;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }

  .book-title {
    margin-bottom: 5px;
  }

  .book-author {
    color: #848282;
  }
`;

function SearchResult({ book }) {
  const { id, title, author, img_url } = book;
  const navigate = useNavigate();

  return (
    <BookContainer onClick={() => navigate(`/bookDetail/${id}`)}>
      <img src={img_url} alt={title} />
      <div className="book-info">
        <h4 className="book-title">{title}</h4>
        <p className="book-author">{author}</p>
      </div>
    </BookContainer>
  );
}

export default SearchResult;
