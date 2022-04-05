import React, { useEffect, useState } from 'react';
import { styled } from 'twin.macro';
import HeatMap from 'react-best-heatmap';
import { getBookCommit } from '../../api/main';

const CommitContainer = styled.div`
  margin-top: 2rem;
  border: 1px solid #f2f2f2;
  border-radius: 30px;
  box-shadow: 0px 0px 6px rgba(1, 1, 1, 0.2);
`;

const today = new Date();
const todayDate = today.getDay();
const term = 7 * 20;
const fstDay = today.setDate(today.getDate() - term - todayDate + 1);

const setWeekDays = [0, 1, 2, 3, 4, 5, 6];
const setlegend = [
  {
    isInRange: v => v === 0,
    color: '#EBEDF0',
    label: '= 0',
  },
  {
    isInRange: v => v === 1,
    color: '#8dcd84',
    label: '= 1',
  },
];

function BookCommit({ values }) {
  const commits = values;

  return (
    <CommitContainer>
      <HeatMap
        startDate={new Date(fstDay)}
        values={commits}
        showWeekDays={setWeekDays}
        rangeDays={term + todayDate}
        legend={setlegend}
      />
    </CommitContainer>
  );
}
export default BookCommit;
