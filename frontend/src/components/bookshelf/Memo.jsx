import tw, { styled } from 'twin.macro';
import { camelToSnake } from '../../utils/formatKey';

const StyledMemo = styled.div`
  ${tw`bg-light-gray`}
  border-radius: 5px;
  padding: 15px 6px;
  min-height: 100px;
  text-align: left;
  font-size: 12px;
  margin: 10px auto;

  .date {
    ${tw`text-main-gray`}
  }

  .content {
    margin-top: 10px;
    word-break: break-word;
  }
`;

function Memo({ memo, navigate }) {
  const { createdAt, content, memoImg, bookInfo } = memo;

  return (
    <StyledMemo
      onClick={() =>
        navigate(`/memo/${bookInfo.id}`, {
          state: { memo: camelToSnake(memo) },
        })
      }
    >
      <p className="date">{createdAt}</p>
      <p className="content">{content}</p>
      {memoImg && <img src={`http://127.0.0.1:8000${memoImg}`} alt={content} />}
    </StyledMemo>
  );
}

export default Memo;
