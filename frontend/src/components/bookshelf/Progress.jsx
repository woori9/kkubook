import tw, { styled } from 'twin.macro';
import ProgressBar from '../common/ProgressBar';

const StyledProgress = styled.div(({ padding }) => [
  tw`bg-light-gray`,
  `
  padding: ${padding};
  font-size: 12px;
  border-radius: 5px;

  p {
    display: inline-block;
  }

  span {
    margin: 5px;
    font-weight: lighter;
  }

  .date {
    font-weight: bold;
    width: 50%;
    text-align: left;
  }

  .progress-container {
    width: 100%;
    margin: 5px auto;
  }

  .page-progress {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 10px;
  }`,
]);

function Pregress({
  startDate,
  endDate,
  currPage,
  totalPage,
  isReading,
  padding,
}) {
  return (
    <StyledProgress padding={padding || '0px'}>
      <p className="date">
        시작일: <span>{startDate || '-'}</span>
      </p>
      <p className="date">
        종료일: <span>{endDate || '-'}</span>
      </p>
      {isReading && (
        <div className="progress-container">
          <ProgressBar value={currPage} totalValue={totalPage} height="7px" />
          <div className="page-progress">
            <p>
              {currPage} / {totalPage} 페이지
            </p>
            <p>{Math.round((currPage / totalPage) * 100)}%</p>
          </div>
        </div>
      )}
    </StyledProgress>
  );
}

export default Pregress;
