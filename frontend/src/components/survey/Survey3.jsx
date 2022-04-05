import { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import InputBtn from './InputBtn';
import PrevNextBtn from './PrevNextBtn';

const Header = styled.h1`
  ${tw`text-[20px] font-medium mb-[2rem]`}
`;

const BtnDiv = styled.div`
  margin: 1rem 3rem 3rem 3rem;

  .grid-box {
    display: grid;
    grid-template-columns: 200px 200px;
    justify-items: center;

    .input-btn {
      width: 80%;
    }
  }
`;

function Survey3({ setPrevPage, setNextPage, addSurveyResult, job }) {
  const jobList = [
    '자유/전문직',
    '경영/관리직',
    '사무/기술직',
    '판매/서비스직',
    '기능/작업/단순노무직',
    '농/림/어/축산업',
    '자영업',
    '전업주부',
    '대학생/대학원생',
    '초/중/고등학생',
    '무직',
    '기타',
  ];

  useEffect(() => {
    const prevSelected = document.querySelector('.selected');
    if (prevSelected) {
      prevSelected.classList.remove('selected');
    }
    if (job !== null) {
      const currentSelected = document.getElementById(jobList[job]);
      currentSelected.classList.add('selected');
    }
  }, [job]);

  return (
    <>
      <Header>어떤 일을 하고 있으세요?</Header>
      <BtnDiv>
        <div className="grid-box">
          {jobList.map(job => (
            <InputBtn
              key={job}
              id={job}
              onClick={() => addSurveyResult('job', jobList.indexOf(job))}
            >
              {job}
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
            job !== null ? setNextPage() : alert('항목을 선택해주세요.')
          }
        >
          다음
        </PrevNextBtn>
      </div>
    </>
  );
}

export default Survey3;
