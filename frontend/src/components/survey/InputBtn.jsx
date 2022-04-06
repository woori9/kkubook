import tw, { styled } from 'twin.macro';

const Btn = styled.button`
  ${tw`bg-transparent`}
  height: 3rem;
  color: #848282;
  padding: 0.5rem;
  border: 1px solid #848282;
  border-radius: 10px;
  margin: 0.5rem;
  cursor: pointer;

  &.selected {
    color: #61b864;
    background-color: #d7f6d7;
    border: 1px solid #61b864;
  }
`;

function InputBtn({ children, id, onClick }) {
  return (
    <Btn type="button" id={id} onClick={onClick} className="input-btn">
      {children}
    </Btn>
  );
}

export default InputBtn;
