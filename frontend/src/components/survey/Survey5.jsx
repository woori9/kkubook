import { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import InputBtn from './InputBtn';
import PrevNextBtn from './PrevNextBtn';

const Header = styled.h1`
  ${tw`text-[20px] font-medium`}
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

function Survey5({
  setPrevPage,
  setNextPage,
  addInterest,
  removeInterest,
  interest,
}) {
  const interestList = [
    '여행',
    '진로',
    '마케팅',
    '리더십',
    '지식',
    '상식',
    '시간관리',
    '심리',
    '페미니즘',
    '글쓰기',
    '요리',
    '역사',
    '음악',
    '철학',
    '건강',
    '공부',
    '사업',
    '외국어',
    '미술',
    '과학',
    '육아',
    '정치',
    '사회',
    '경제',
    '재테크',
    '관계',
    '소통',
    '가족',
  ];

  useEffect(() => {
    if (interest.length > 0) {
      interest.forEach(interestItem => {
        document.getElementById(interestItem).classList.add('selected');
      });
    }
  }, [interest]);

  function handleAddInterest(interestItem) {
    if (interest.indexOf(interestItem) >= 0) {
      removeInterest(interestItem);
      document.getElementById(interestItem).classList.remove('selected');
    } else if (interest.length === 5) {
      alert('최대 5개까지 선택 가능합니다.');
    } else {
      addInterest(interestItem);
      document.getElementById(interestItem).classList.add('selected');
    }
  }

  return (
    <>
      <Header>요즘 관심사는 무엇인가요?</Header>
      <span>(최대 5개)</span>
      <BtnDiv>
        <div className="grid-box">
          {interestList.map(interestItem => (
            <InputBtn
              key={interestItem}
              id={interestItem}
              onClick={() => handleAddInterest(interestItem)}
            >
              {interestItem}
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
            interest.length > 0 ? setNextPage() : alert('항목을 선택해주세요.')
          }
        >
          다음
        </PrevNextBtn>
      </div>
    </>
  );
}

export default Survey5;
