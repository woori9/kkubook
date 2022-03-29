import { styled } from 'twin.macro';

const StyledHeader = styled.header`
  position: fixed;
  max-width: 500px;
  width: 100%;
  top: 0px;
  background-color: #e2e2e2;
  height: 3rem;
`;

function Header({ children }) {
  return <StyledHeader>{children}</StyledHeader>;
}

export default Header;
