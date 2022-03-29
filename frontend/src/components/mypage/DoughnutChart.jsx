import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Title } from 'chart.js';
import tw, { styled } from 'twin.macro';

ChartJS.register(ArcElement, Tooltip, Title);

const MiddleText = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: 160px;
  line-height: 19px;
  text-align: center;
  font-size: 20px;
  z-index: 99999999999;
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

const data = [
  {
    name: '경제경영',
    count: 10,
  },
  {
    name: '과학',
    count: 2,
  },
  {
    name: '자기계발',
    count: 1,
  },
];

const chartData = {
  labels: data.map(genre => genre.name),
  datasets: [
    {
      label: 'Genre Statistics',
      data: data.map(genre => genre.count),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
      hoverOffset: 4,
    },
  ],
};

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

function DoughnutChart() {
  return (
    <>
      <MiddleText>3분야</MiddleText>
      <Doughnut data={chartData} options={chartOptions} />
      <GenreList>
        {data.map(genreItem => (
          <GenreListItem name={genreItem.name} key={genreItem.name}>
            <div>
              <span>{genreItem.count}권</span>
              <span>{Math.round((genreItem.count / 13) * 100)}%</span>
            </div>
          </GenreListItem>
        ))}
      </GenreList>
    </>
  );
}

export default DoughnutChart;
