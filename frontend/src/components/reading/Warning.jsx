import tw, { styled } from 'twin.macro';
import useStore from '../../stores/bottomSheet';
import worryingKkubook from '../../assets/worrying-kkubook.png';

const WarningSheet = styled.div`
  width: 80%;
  text-align: center;
  margin: 0 auto;

  .kkubook-img {
    height: 150px;
    margin: 20px 0px;
  }

  .message {
    margin-bottom: 3rem;
    font-size: 13px;
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

function Warning() {
  const hideBottomSheet = useStore(state => state.onDismiss);
  const setIsCurrentPage = useStore(state => state.onSubmit);

  const stopReading = () => {
    hideBottomSheet();
    setIsCurrentPage('record');
  };

  return (
    <WarningSheet>
      <img
        className="kkubook-img"
        src={worryingKkubook}
        alt="worrying-kkubook"
      />
      <div className="message">
        <p>2분 동안 책을 읽어보세요.</p>
        <p>그래도 읽기 힘들다면 새로운 책을 추천해 드릴게요.</p>
      </div>
      <div className="button-group">
        <button className="stop" type="button" onClick={stopReading}>
          그만 읽기
        </button>
        <button className="back" type="button" onClick={hideBottomSheet}>
          돌아가기
        </button>
      </div>
    </WarningSheet>
  );
}

export default Warning;
