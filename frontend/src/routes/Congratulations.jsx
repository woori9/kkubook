import { useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import tw, { styled } from 'twin.macro';
import happyKkubook from '../assets/happy-kkubook.png';
import CongratsInfo from '../components/reading/CongratsInfo';

const Page = styled.div`
  ${tw`flex flex-col justify-center items-center`}
  height: 100vh;
`;

const KkubookImg = styled.img`
  ${tw`block w-[150px]`}
  height: auto;
  margin-bottom: 1.5rem;
`;

const CongratsMessage = styled.h1`
  font-size: 26px;
  margin-bottom: 5rem;
`;

function Congratulations() {
  const { bookStatus } = useParams();
  const { innerWidth, innerHeight } = window;
  const width = innerWidth <= 500 ? innerWidth : 500;
  return (
    <Page>
      <Confetti width={width} height={innerHeight} />
      <KkubookImg src={happyKkubook} alt="happy kkubook character" />
      <CongratsMessage>100일 달성!</CongratsMessage>
      <CongratsInfo bookStatus={bookStatus} />
    </Page>
  );
}

export default Congratulations;
