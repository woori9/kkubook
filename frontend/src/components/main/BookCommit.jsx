import React, { useEffect, useState } from 'react';
import { styled } from 'twin.macro';
// import HeatMap from 'react-best-heatmap';
import CalendarHeatmap from 'react-calendar-heatmap';
import './css/react-calendar-heatmap.css';

const CommitContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem 0 0 0.5rem;
  border: 1px solid #f2f2f2;
  border-radius: 30px;
  box-shadow: 0px 0px 6px rgba(1, 1, 1, 0.2);

  svg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    margin-top: 0.7rem;
  }
`;

const today = new Date();
// const todayDate = today.getDay();
// const term = 7 * 20;
// const fstDay = today.setDate(today.getDate() - term - todayDate + 1);

// const setWeekDays = [0, 1, 2, 3, 4, 5, 6];
// const setlegend = [
//   {
//     isInRange: v => v === 0,
//     color: '#EBEDF0',
//     label: '= 0',
//   },
//   {
//     isInRange: v => v === 1,
//     color: '#8dcd84',
//     label: '= 1',
//   },
// ];

const todayTimeStamp = today.getTime();
const curDay = today.getDay();

function BookCommit({ values }) {
  const commits = values;

  return (
    <CommitContainer>
      {/* <HeatMap
        startDate={new Date(fstDay)}
        values={commits}
        showWeekDays={setWeekDays}
        rangeDays={term + todayDate}
        legend={setlegend}
      /> */}
      <CalendarHeatmap
        startDate={
          new Date(todayTimeStamp - (140 - (6 - curDay)) * 24 * 60 * 60 * 1000)
        }
        endDate={new Date()}
        values={commits.map(commit => ({ date: commit.date }))}
        monthLabels={new Array(12).fill(0).map((_, idx) => `${idx + 1}`)}
        weekdayLabels={['일', '월', '화', '수', '목', '금', '토']}
        showWeekdayLabels
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          return `color-filled`;
        }}
      />
    </CommitContainer>
  );
}
export default BookCommit;
