import { useNavigate } from 'react-router-dom';
import { styled } from 'twin.macro';
import useStore from '../../stores/bottomSheet';
import useStoreMemo from '../../stores/memo';
import { apiDeleteMemo } from '../../api/memo';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 1rem;
`;

const Message = styled.div`
  padding: 2rem 0 2rem 0;
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Button = styled.button`
  width: 100%;
  height: 3rem;
  margin-top: 1rem;
  cursor: pointer;
  color: ${props => (props.delete ? '#ffffff' : '#000')};
  border: none;
  border-radius: 10px;
  background-color: ${props => (props.delete ? '#ff5858' : '#f2f2f2')};
`;

function DeleteMemo() {
  const navigate = useNavigate();
  const onDismiss = useStore(state => state.onDismiss);

  const memoId = useStoreMemo(state => state.nowMemoId);
  function actionDeleteMemo() {
    apiDeleteMemo({ memo_id: memoId });
  }

  return (
    <Body>
      <Message>
        <p>선택한 항목을 정말 삭제하시겠습니까?</p>
      </Message>
      <Buttons>
        <Button
          delete
          type="button"
          onClick={() => {
            actionDeleteMemo();
            onDismiss();
            navigate(-1);
          }}
        >
          메모 삭제하기
        </Button>
        <Button
          type="button"
          onClick={() => {
            onDismiss();
            navigate(-1);
          }}
        >
          취소
        </Button>
      </Buttons>
    </Body>
  );
}
export default DeleteMemo;
