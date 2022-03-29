import { styled } from 'twin.macro';

const StyledFooter = styled.footer`
  position: fixed;
  max-width: 500px;
  width: 100%;
  background-color: beige;
  bottom: 0px;
`;

function Footer({ children }) {
  return <StyledFooter>{children}</StyledFooter>;
}

export default Footer;
