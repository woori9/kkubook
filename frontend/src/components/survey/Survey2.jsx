import { useEffect } from 'react';
import InputBtn from './InputBtn';
import PrevNextBtn from './PrevNextBtn';
import SurveyHeader from './SurveyHeader';
import SurveyContent from './SurveyContent';
import Footer from '../common/Footer';

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
      <SurveyHeader mainText="분량이 어떤 책을 선호하시나요?" />
      <SurveyContent repeat={1} buttonWidth="50%" marginTop="7rem">
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
      </SurveyContent>
      <Footer>
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
      </Footer>
    </>
  );
}

export default Survey2;
