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
    grid-template-columns: 100px 100px 100px;
    justify-items: center;

    .input-btn {
      width: 80%;
    }
  }
`;

function Survey6({ setPrevPage, completeSurvey, addSurveyResult, category }) {
  const categoryList = ['문학', '과학', '사회', '예술', '자기계발', '아무거나'];

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
      <Header>선호하는 장르는 무엇인가요?</Header>
      <BtnDiv>
        <div className="grid-box">
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
        </div>
      </BtnDiv>
      <div>
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
      </div>
    </>
  );
}

export default Survey6;
