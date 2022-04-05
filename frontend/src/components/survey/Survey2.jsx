import { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import InputBtn from './InputBtn';
import PrevNextBtn from './PrevNextBtn';

const Header = styled.h1`
  ${tw`text-[20px] font-medium mb-[9rem]`}
`;

const BtnDiv = styled.div`
  margin: 1rem 3rem 3rem 3rem;
  .grid-box {
    display: grid;
    grid-template-columns: 200px 200px;
    justify-items: center;

    .input-btn {
      width: 70%;
    }
  }
`;

function Survey2({ setPrevPage, setNextPage, addSurveyResult, amount }) {
  const amountList = ['얇은 책', '보통인 책', '두꺼운 책', '아무거나'];

  useEffect(() => {
    const prevSelected = document.querySelector('.selected');
    if (prevSelected) {
      prevSelected.classList.remove('selected');
    }
    if (amount !== null) {
      const currentSelected = document.getElementById(amountList[amount]);
      currentSelected.classList.add('selected');
    }
  }, [amount]);

  return (
    <>
      <Header>분량이 어떤 책을 선호하시나요?</Header>
      <BtnDiv>
        <div className="grid-box">
          {amountList.map(amount => (
            <InputBtn
              key={amount}
              id={amount}
              onClick={() =>
                addSurveyResult('amount', amountList.indexOf(amount))
              }
            >
              {amount}
            </InputBtn>
          ))}
        </div>
      </BtnDiv>
      <div>
        <PrevNextBtn btnClass="prev" onClick={() => setPrevPage()}>
          이전
        </PrevNextBtn>
        <PrevNextBtn
          btnClass="next"
          onClick={() =>
            amount !== null ? setNextPage() : alert('항목을 선택해주세요.')
          }
        >
          다음
        </PrevNextBtn>
      </div>
    </>
  );
}

export default Survey2;
