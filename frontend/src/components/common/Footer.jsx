import { styled } from 'twin.macro';

const StyledFooter = styled.footer`
  position: fixed;
  max-width: 500px;
  width: 100%;
  background-color: white;
  bottom: 0px;
  text-align: center;
  padding: 0px 0px 15px;
`;

const GradientBox = styled.div`
  position: absolute;
  top: -24px;
  left: 0px;
  width: 100%;
  height: 24px;
  z-index: 2;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.95) 99.9%,
    rgba(255, 255, 255, 0.95) 99.99%
  );
`;

function Footer({ children }) {
  return (
    <StyledFooter>
      <GradientBox />
      {children}
    </StyledFooter>
  );
}

export default Footer;
