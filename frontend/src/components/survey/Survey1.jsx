import { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import InputBtn from './InputBtn';
import PrevNextBtn from './PrevNextBtn';
import SurveyHeader from './SurveyHeader';
import Footer from '../common/Footer';
import SurveyContent from './SurveyContent';

const H1 = styled.h1`
  ${tw`text-[20px] font-semibold`}
  position: absolute;
  top: -2rem;
  left: 2.4rem;
`;

function Survey1({ setNextPage, addSurveyResult, age }) {
  const ageList = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

  useEffect(() => {
    const prevSelected = document.querySelector('.selected');
    if (prevSelected) {
      prevSelected.classList.remove('selected');
    }
    if (age !== null) {
      const currentSelected = document.getElementById(ageList[age]);
      currentSelected.classList.add('selected');
    }
  }, [age]);

  return (
    <>
      <SurveyHeader
        mainText="당신에 대해 조금 더 알려주세요."
        subText="본 응답은 책 추천 목적으로만 사용됩니다."
      />

      <SurveyContent repeat={2} buttonWidth="60%" marginTop="8rem">
        <H1>나이</H1>
        {ageList.map(age => (
          <InputBtn
            key={age}
            id={age}
            onClick={() => addSurveyResult('age', ageList.indexOf(age))}
          >
            {age}
          </InputBtn>
        ))}
      </SurveyContent>
      <Footer>
        <PrevNextBtn
          btnClass="next"
          onClick={() =>
            age !== null ? setNextPage() : alert('항목을 선택해주세요.')
          }
        >
          다음
        </PrevNextBtn>
      </Footer>
    </>
  );
}

export default Survey1;
