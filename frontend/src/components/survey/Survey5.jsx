import { useEffect } from 'react';
import InputBtn from './InputBtn';
import PrevNextBtn from './PrevNextBtn';
import SurveyHeader from './SurveyHeader';
import SurveyContent from './SurveyContent';
import Footer from '../common/Footer';

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
      <SurveyHeader mainText="요즘 관심사는 무엇인가요?" subText="(최대 5개)" />
      <SurveyContent
        repeat={3}
        buttonWidth="70%"
        marginTop="2rem"
        paddingBottom="5rem"
      >
        {interestList.map(interestItem => (
          <InputBtn
            key={interestItem}
            id={interestItem}
            onClick={() => handleAddInterest(interestItem)}
          >
            {interestItem}
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
            interest.length > 0 ? setNextPage() : alert('항목을 선택해주세요.')
          }
        >
          다음
        </PrevNextBtn>
      </Footer>
    </>
  );
}

export default Survey5;
