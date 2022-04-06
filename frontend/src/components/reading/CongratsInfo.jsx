import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import buttonImage from '../../assets/button-image.png';

const Info = styled.article`
  ${tw`flex flex-col justify-center items-center bg-light-gray`}
  position: absolute;
  bottom: 2rem;
  width: 75%;
  padding: 1.5rem 0.5rem;
  border-radius: 10px;

  p {
    line-height: 1.2;
    text-align: center;
    margin-bottom: 0.5rem;
  }
`;

const GoHomeBtn = styled.button`
  ${tw`bg-main-green text-[#fff]`}
  width: 90%;
  height: 2.5rem;
  padding: 0;
  margin: 0.5rem 5px;
  border-radius: 10px;
  border: none;
  font-size: 15px;
`;

const KkubookDiv = styled.div`
  ${tw`flex justify-center items-center bg-[#fff] shadow-lg`}
  position: absolute;
  top: -3rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const KkubookImg = styled.img`
  ${tw`block`}
  width: 80%;
  height: auto;
`;

function CongratsInfo({ bookStatus }) {
  const navigate = useNavigate();

  return (
    <Info>
      <KkubookDiv>
        <KkubookImg src={buttonImage} />
      </KkubookDiv>
      <p>
        꾸북 챌린지에 다시 도전하려면
        <br />
        우측 하단에 있는 꾸북이를 찾아주세요
      </p>
      <GoHomeBtn
        type="button"
        onClick={() => {
          if (bookStatus === '0') {
            navigate('/review');
          } else {
            navigate('/bookshelf');
          }
        }}
      >
        확인
      </GoHomeBtn>
    </Info>
  );
}

export default CongratsInfo;
