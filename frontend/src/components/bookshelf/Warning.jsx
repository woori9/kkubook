import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import useStore from '../../stores/bottomSheet';

const WarningSheet = styled.div`
  width: 80%;
  text-align: center;
  margin: 0 auto;

  .kkubook-img {
    height: 150px;
    margin: 20px 0px;
  }

  .message {
    font-size: 16px;
    padding: 20px 0px;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;

    button {
      width: 100%;
      height: 2.5rem;
      margin: 5px;
      border-radius: 10px;
      border: none;
      font-size: 15px;
    }
  }

  .stop {
    ${tw`bg-main-red`}
    color: white
  }

  .back {
    ${tw`bg-light-gray`}
  }
`;

const getTextByStatus = {
  2: '서재에서 책이 삭제되며 삭제한 내용은 복구되지 않습니다.',
  3: '서재에서 책이 삭제되며 독서 기록도 함께 삭제됩니다. 삭제한 내용은 복구되지 않습니다.',
};

function Warning({ status }) {
  const hideBottomSheet = useStore(state => state.onDismiss);
  const deleteBook = useStore(state => state.onSubmit);
  const navigate = useNavigate();

  return (
    <WarningSheet>
      <div className="message">
        <p>{getTextByStatus[status]}</p>
      </div>
      <div className="button-group">
        <button
          className="stop"
          type="button"
          onClick={() => {
            hideBottomSheet();
            deleteBook();
            navigate(-1);
          }}
        >
          책 삭제하기
        </button>
        <button className="back" type="button" onClick={hideBottomSheet}>
          취소
        </button>
      </div>
    </WarningSheet>
  );
}

export default Warning;
