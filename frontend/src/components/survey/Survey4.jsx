import { useEffect } from 'react';
import InputBtn from './InputBtn';
import PrevNextBtn from './PrevNextBtn';
import SurveyHeader from './SurveyHeader';
import SurveyContent from './SurveyContent';
import Footer from '../common/Footer';

function Survey4({ setPrevPage, setNextPage, addSurveyResult, feeling }) {
  const feelingList = [
    '💧  슬퍼요',
    '🛫 떠나고 싶어요',
    '💚 행복해요',
    '💤 무기력해요',
    '💬 심심해요',
    '💊 고민이 있어요',
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
      <SurveyHeader mainText="요즘 기분은 어떠신가요?" />
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
          이전
        </PrevNextBtn>
        <PrevNextBtn
          btnClass="next"
          onClick={() =>
            feeling !== null ? setNextPage() : alert('항목을 선택해주세요.')
          }
        >
          다음
        </PrevNextBtn>
      </Footer>
    </>
  );
}

export default Survey4;
