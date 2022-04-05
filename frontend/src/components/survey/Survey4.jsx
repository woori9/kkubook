import { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import InputBtn from './InputBtn';
import PrevNextBtn from './PrevNextBtn';

const Header = styled.h1`
  ${tw`text-[20px] font-medium mb-[2rem]`}
`;

const BtnDiv = styled.div`
  ${tw`flex flex-col`}
  margin: 1rem 3rem 3rem 3rem;
`;

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
      <Header>요즘 기분은 어떠신가요?</Header>
      <BtnDiv>
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
      </BtnDiv>
      <div>
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
      </div>
    </>
  );
}

export default Survey4;
