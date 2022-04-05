import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import InputBtn from './InputBtn';
import PrevNextBtn from './PrevNextBtn';

const MainText = styled.p`
  ${tw`text-[20px] font-medium mb-4`}
`;

const SubText = styled.p`
  ${tw`text-[#848282] text-[15px] mb-[6rem]`}
`;

const H1 = styled.h1`
  ${tw`text-[20px] font-semibold`}
  margin: 0 auto 0 2rem;
`;

const BtnDiv = styled.div`
  margin: 1rem 3rem 3rem 3rem;

  .grid-box {
    display: grid;
    grid-template-columns: 200px 200px;
    justify-items: center;

    .input-btn {
      width: 60%;
    }
  }
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
      <div>
        <MainText>당신에 대해 조금 더 알려주세요.</MainText>
        <SubText>본 응답은 책 추천 목적으로만 사용됩니다.</SubText>
      </div>

      <H1>나이</H1>
      <BtnDiv>
        <div className="grid-box">
          {ageList.map(age => (
            <InputBtn
              key={age}
              id={age}
              onClick={() => addSurveyResult('age', ageList.indexOf(age))}
            >
              {age}
            </InputBtn>
          ))}
        </div>
      </BtnDiv>
      <div>
        <PrevNextBtn
          btnClass="next"
          onClick={() =>
            age !== null ? setNextPage() : alert('항목을 선택해주세요.')
          }
        >
          다음
        </PrevNextBtn>
      </div>
    </>
  );
}

export default Survey1;
