import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { months, days } from '../../utils/days';
import Svg from '../common/Svg';
import DoughnutChart from './DoughnutChart';
import { getUserStatistics } from '../../api/user';
import BookList from './BookList';
import EmptyMessage from './EmptyMessage';

const StatisticBox = styled.div`
  ${tw`px-page-x`}
  background: none;
  padding-bottom: 65px;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #8dcd84;
  }

  .month-div {
    display: flex;
    justify-content: space-evenly;
  }

  .date {
    font-size: 16px;
    text-align: center;
    z-index: 1;
  }

  .year {
    position: relative;
    font-size: 14px;
    padding-top: 1rem;
  }
`;

const Month = styled.button`
  ${tw`border-none bg-transparent`}

  &.prev-next {
    color: #fff;
  }

  &.current {
    color: #000;
  }

  &.possible {
    cursor: pointer;
  }
`;

const Dl = styled.dl`
  ${tw`flex justify-evenly py-5`}
`;

const Box = styled.div`
  ${tw`flex flex-col items-center bg-white p-3 mb-3`}
  border: 0.1px solid #a1a1a1;
  border-radius: 10px;
  box-shadow: 0px 2px 4px 0px #00000040;
  z-index: 1;

  .desc-data {
    display: flex;
    justify-content: space-between;
    margin-top: 0.25rem;

    dt {
      margin-right: 1rem;
    }
  }
`;

const today = new Date();

// 가장 마지막 달(=달력 기준 이번 달)
const thisYear = today.getFullYear();
const thisMonth = today.getMonth() + 1;

const lastYearMonth =
  thisYear.toString() +
  (thisMonth < 10 ? `0${thisMonth.toString()}` : thisMonth.toString());

function Statistics({ createdAt }) {
  // TODO: get~Month 함수 호출 때 api 요청
  const [year, setYear] = useState(thisYear);
  const [monthIdx, setMonthIdx] = useState(thisMonth - 1);
  const [userStatistics, setUserStatistics] = useState({});

  // 가장 첫 달(=유저가 db에 created 된 날)
  const firstYearMonth =
    createdAt && createdAt.length > 0
      ? createdAt.split('-').slice(0, 2).join('')
      : '';

  // 현재 통계를 보고 있는 달
  let currentYearMonth =
    year.toString() +
    (months[monthIdx] < 10
      ? `0${months[monthIdx]}`
      : months[monthIdx].toString());

  useEffect(() => {
    currentYearMonth =
      year.toString() +
      (months[monthIdx] < 10
        ? `0${months[monthIdx]}`
        : months[monthIdx].toString());
    getUserStatistics(
      currentYearMonth,
      response => {
        setUserStatistics(response.data);
      },
      error => console.log(error),
    );
  }, [monthIdx]);

  function getPrevMonth() {
    if (months[monthIdx] - 1 < 1) setYear(prev => prev - 1);
    setMonthIdx((monthIdx + 11) % 12);
  }

  function getNextMonth() {
    if (months[monthIdx] + 1 > 12) setYear(prev => prev + 1);
    setMonthIdx((monthIdx + 1) % 12);
  }

  return (
    <StatisticBox>
      <p className="date year">{year}</p>
      <div className="month-div">
        {/* 첫 달 제한 */}
        {currentYearMonth <= firstYearMonth ? (
          <Month disabled />
        ) : (
          <Month
            className="possible date prev-next"
            onClick={() => getPrevMonth()}
          >
            {months[(monthIdx + 11) % 12]}
          </Month>
        )}
        {/* 이번 달 */}
        <Month className="date current">{months[monthIdx]}</Month>
        {/* 끝 달 제한 */}
        {lastYearMonth <= currentYearMonth ? (
          <Month disabled />
        ) : (
          <Month
            className="possible date prev-next"
            onClick={() => getNextMonth()}
          >
            {months[(monthIdx + 1) % 12]}
          </Month>
        )}
      </div>
      <Dl>
        <Box>
          <Svg stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </Svg>
          <div className="desc-data">
            <dt>책</dt>
            <dd>
              <strong>{userStatistics.book_num}</strong>권
            </dd>
          </div>
        </Box>
        <Box>
          <Svg stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </Svg>
          <div className="desc-data">
            <dt>독서일</dt>
            <dd>
              <strong>{userStatistics.commit_num}</strong>일 /{' '}
              <strong>{days[monthIdx]}</strong>일
            </dd>
          </div>
        </Box>
      </Dl>
      {userStatistics.book_num > 0 ? (
        <>
          <BookList books={userStatistics.book_img} />
          <Box>
            <DoughnutChart
              data={userStatistics.category}
              bookCnt={userStatistics.book_num}
            />
          </Box>
        </>
      ) : (
        <EmptyMessage />
      )}
    </StatisticBox>
  );
}

export default Statistics;
