import tw, { styled, css } from 'twin.macro';

const ModalBackdrop = styled.div`
  display: none;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  max-width: 500px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  ${props =>
    props.open &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      animation: modal-bg-show 0.3s;
    `}

  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Modal = styled.section`
  width: 80%;
  max-width: 450px;
  height: 60%;
  max-height: 430px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: modal-show 0.3s;
  overflow: hidden;

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;

const ModalContent = styled.div`
  ${tw`relative`}
  height: 100%;
  padding: 1.5rem;
`;

function CenteredModalBase({ children, open, close }) {
  return (
    <ModalBackdrop open={open} onClick={close}>
      {open ? (
        <Modal onClick={e => e.stopPropagation()}>
          <ModalContent>{children}</ModalContent>
        </Modal>
      ) : null}
    </ModalBackdrop>
  );
}

export default CenteredModalBase;
