import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import buttonImage from '../../assets/button-image.png';
import KkubookModal from './KkubookModal';

const Button = styled.button`
  ${tw`flex justify-center items-center fixed w-[50px] h-[50px] bottom-[60px] right-5 bg-[#fff] cursor-pointer border-none shadow-lg z-[3]`}
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
    <>
      <Button type="button" onClick={() => setModalOpen(true)}>
        <ButtonImg src={buttonImage} alt="kkubook info" />
      </Button>
      <KkubookModal open={modalOpen} close={() => setModalOpen(false)} />
    </>
  );
}

export default FabButton;
