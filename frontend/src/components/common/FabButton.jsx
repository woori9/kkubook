import { useState, memo } from 'react';
import tw, { styled } from 'twin.macro';
import buttonImage from '../../assets/button-image.png';
import KkubookModal from './KkubookModal';

const ButtonDiv = styled.div`
  ${tw`z-[3]`}
  position: fixed;
  bottom: 0;
  max-width: 500px;
  width: 100%;
`;

const Button = styled.button`
  ${tw`flex justify-center items-center absolute w-[50px] h-[50px] bottom-[60px] right-3 bg-[#fff] cursor-pointer border-none shadow-lg`}
  border-radius: 50%;
`;

const ButtonImg = styled.img`
  ${tw`block`}
  width: 90%;
  height: auto;
`;

function FabButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ButtonDiv>
      <Button type="button" onClick={() => setModalOpen(true)}>
        <ButtonImg src={buttonImage} alt="kkubook info" />
      </Button>
      <KkubookModal open={modalOpen} close={() => setModalOpen(false)} />
    </ButtonDiv>
  );
}

export default memo(FabButton);
