import styled from 'styled-components';

const CardWrapper = styled.div`
  background-color: transparent;
  padding: 0 0.5rem;
`;

const StyledCard = styled.div`
  position: relative;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;
  min-height: 240px;
  width: 100%;
  margin: 10px auto;
  box-shadow: 0px 0px 6px rgba(1, 1, 1, 0.2);
  background-color: white;
`;

function Card({ children }) {
  return (
    <CardWrapper>
      <StyledCard>{children}</StyledCard>
    </CardWrapper>
  );
}

export default Card;
