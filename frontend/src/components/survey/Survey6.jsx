import { useEffect } from 'react';
import InputBtn from './InputBtn';
import PrevNextBtn from './PrevNextBtn';
import SurveyHeader from './SurveyHeader';
import SurveyContent from './SurveyContent';
import Footer from '../common/Footer';

function Survey6({ setPrevPage, completeSurvey, addSurveyResult, category }) {
  const categoryList = ['아무거나', '문학', '과학', '사회', '예술', '자기계발'];

  useEffect(() => {
    const prevSelected = document.querySelector('.selected');
    if (prevSelected) {
      prevSelected.classList.remove('selected');
    }
    if (category !== null) {
      const currentSelected = document.getElementById(categoryList[category]);
      currentSelected.classList.add('selected');
    }
  }, [category]);

  return (
    <>
      <SurveyHeader mainText="선호하는 장르는 무엇인가요?" />
      <SurveyContent repeat={3} buttonWidth="80%" marginTop="10rem">
        {categoryList.map(category => (
          <InputBtn
            key={category}
            id={category}
            onClick={() =>
              addSurveyResult('category', categoryList.indexOf(category))
            }
          >
            {category}
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
            category !== null ? completeSurvey() : alert('항목을 선택해주세요.')
          }
        >
          완료
        </PrevNextBtn>
      </Footer>
    </>
  );
}

export default Survey6;
