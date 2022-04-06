import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Title } from 'chart.js';
import tw, { styled } from 'twin.macro';

ChartJS.register(ArcElement, Tooltip, Title);

const MiddleText = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  top: 55%;
  left: 0;
  margin-top: 157px;
  line-height: 19px;
  text-align: center;
  font-size: 20px;
  z-index: 1;
`;

const GenreList = styled.ol`
  ${tw`w-full p-0 list-none px-3 py-2`}
`;

const GenreListItem = styled.li`
  ${tw`flex justify-between w-full`}
  counter-increment: custom;
  word-spacing: 0.5em;

  &:before {
    content: counter(custom) ' ${props => props.name}';
  }

  &:first-child {
    counter-reset: custom;
  }

  div span:first-child {
    margin-right: 10px;
  }
`;

const chartOptions = {
  cutout: '80%',
  plugins: {
    title: {
      display: true,
      text: '장르별',
      font: {
        family: '"NanumSquare", sans-serif',
        size: 16,
      },
      padding: {
        top: 15,
        bottom: 20,
      },
    },
  },
};

function DoughnutChart({ data, bookCnt }) {
  const chartData = {
    labels: Object.keys(data).map(key => key),
    datasets: [
      {
        label: 'Genre Statistics',
        data: Object.keys(data).map(key => data[key]),
        backgroundColor: [
          'rgb(255, 205, 86)',
          'rgb(164, 235, 77)',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(84, 207, 133)',
          'rgb(255, 133, 72)',
          'rgb(157, 81, 232)',
          'rgb(20, 239, 189)',
          'rgb(33, 99, 205)',
          'rgb(231, 105, 233)',
          'rgb(244, 241, 35)',
          'rgb(24, 215, 238)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <MiddleText>{Object.keys(data).length}분야</MiddleText>
      <Doughnut data={chartData} options={chartOptions} />
      <GenreList>
        {Object.keys(data).map(key => (
          <GenreListItem name={key} key={key}>
            <div>
              <span>{data[key]}권</span>
              <span>{Math.round((data[key] / bookCnt) * 100)}%</span>
            </div>
          </GenreListItem>
        ))}
      </GenreList>
    </>
  );
}

export default DoughnutChart;
