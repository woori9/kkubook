import tw, { styled } from 'twin.macro';

const StyledMemo = styled.div`
  ${tw`bg-light-gray`}
  border-radius: 5px;
  padding: 15px 6px;
  min-height: 100px;
  text-align: left;
  font-size: 12px;

  .date {
    ${tw`text-main-gray`}
  }

  .content {
    margin-top: 10px;
  }
`;

function Memo({ memo }) {
  return (
    <StyledMemo>
      <p className="date">{memo.date}</p>
      <p className="content">{memo.content}</p>
      {memo.image && <img src={memo.image} alt="memo" />}
    </StyledMemo>
  );
}

export default Memo;
