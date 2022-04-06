import tw, { styled } from 'twin.macro';

const CardWrapper = styled.div(({ padding }) => [
  `
  background-color: transparent;
  padding: ${padding || '0rem 0.5rem'};
  width: 100%;
  height: 35vh;
  `,
]);

const StyledCard = styled.div`
  position: relative;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 6px rgba(1, 1, 1, 0.2);
  background-color: white;
  padding: 2rem;
  height: 99%;
`;

function Card({ children, wrapperPadding }) {
  return (
    <CardWrapper padding={wrapperPadding}>
      <StyledCard>{children}</StyledCard>
    </CardWrapper>
  );
}

export default Card;
