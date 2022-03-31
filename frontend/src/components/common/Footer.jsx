import { styled } from 'twin.macro';

const StyledFooter = styled.footer`
  position: fixed;
  max-width: 500px;
  width: 100%;
  background-color: white;
  bottom: 0px;
  text-align: center;
  padding: 20px 0px;
`;

function Footer({ children }) {
  return <StyledFooter>{children}</StyledFooter>;
}

export default Footer;
