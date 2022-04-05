import { styled } from 'twin.macro';

const BtnDiv = styled.div`
  position: fixed;
  bottom: 0;
  max-width: 500px;
  width: 100%;
  transform: translate(-50%, -50%);
`;

const Btn = styled.button`
  position: absolute;
  bottom: 2rem;
  width: 9rem;
  height: 3rem;
  border-radius: 10px;

  &.prev {
    left: 2rem;
    color: #8dcd84;
    border: 1px solid #8dcd84;
    background-color: #fff;
  }

  &.next {
    right: 2rem;
    color: #fff;
    border: 0;
    background-color: #8dcd84;
  }
`;

function InputBtn({ children, btnClass, onClick }) {
  return (
    <BtnDiv>
      <Btn type="button" className={btnClass} onClick={onClick}>
        {children}
      </Btn>
    </BtnDiv>
  );
}

export default InputBtn;
