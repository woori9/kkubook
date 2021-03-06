import { useEffect } from 'react';
import InputBtn from './InputBtn';
import PrevNextBtn from './PrevNextBtn';
import SurveyHeader from './SurveyHeader';
import SurveyContent from './SurveyContent';
import Footer from '../common/Footer';

function Survey4({ setPrevPage, setNextPage, addSurveyResult, feeling }) {
  const feelingList = [
    'π§  μ¬νΌμ',
    'π« λ λκ³  μΆμ΄μ',
    'π νλ³΅ν΄μ',
    'π€ λ¬΄κΈ°λ ₯ν΄μ',
    'π¬ μ¬μ¬ν΄μ',
    'π κ³ λ―Όμ΄ μμ΄μ',
  ];

  useEffect(() => {
    const prevSelected = document.querySelector('.selected');
    if (prevSelected) {
      prevSelected.classList.remove('selected');
    }
    if (feeling !== null) {
      const currentSelected = document.getElementById(feelingList[feeling]);
      currentSelected.classList.add('selected');
    }
  }, [feeling]);

  return (
    <>
      <SurveyHeader mainText="μμ¦ κΈ°λΆμ μ΄λ μ κ°μ?" />
      <SurveyContent repeat={1} buttonWidth="40%" marginTop="4rem">
        {feelingList.map(feeling => (
          <InputBtn
            key={feeling}
            id={feeling}
            onClick={() =>
              addSurveyResult('feeling', feelingList.indexOf(feeling))
            }
          >
            {feeling}
          </InputBtn>
        ))}
      </SurveyContent>
      <Footer>
        <PrevNextBtn btnClass="prev" onClick={() => setPrevPage()}>
          μ΄μ 
        </PrevNextBtn>
        <PrevNextBtn
          btnClass="next"
          onClick={() =>
            feeling !== null ? setNextPage() : alert('ν­λͺ©μ μ νν΄μ£ΌμΈμ.')
          }
        >
          λ€μ
        </PrevNextBtn>
      </Footer>
    </>
  );
}

export default Survey4;
