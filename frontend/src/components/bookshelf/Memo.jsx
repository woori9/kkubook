import tw, { styled } from 'twin.macro';
import getCurrentDate from '../../utils/currentDate';

const Container = styled.div`
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 1rem 0.5rem 1rem 0.5rem;
  margin-bottom: 1.5rem;
`;

const MemoContnet = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  .memo-text {
    text-align: left;
    padding-bottom: 1rem;
    .memo-date {
      color: #a1a1a1;
      padding-bottom: 1rem;
    }
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

function Memo({ memo, navigate }) {
  const { book_info, content, created_at, is_img, memo_img } = memo;
  const styledDate = getCurrentDate(created_at);

  return (
    <Container>
      <MemoContnet
        role="button"
        onClick={() => navigate(`/memo/${book_info.id}`, { state: { memo } })}
        onKeyDown={() => ''}
        tabIndex={0}
      >
        <div className="memo-text">
          <p className="memo-date">{styledDate}</p>
          <p>{content}</p>
        </div>
        {is_img !== null ? (
          <div className="memo-img">
            <img src={memo_img} alt="memo-img" />
          </div>
        ) : null}
      </MemoContnet>
    </Container>
  );
}

export default Memo;
