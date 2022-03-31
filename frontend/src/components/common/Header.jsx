import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

const StyledHeader = styled.header(({ background }) => [
  tw`text-main-gray`,
  `position: fixed;
  max-width: 500px;
  width: 100%;
  top: 0px;
  display: flex;
  background-color: ${background};
  padding-right: 1rem;
  font-size: 17px;
  z-index: 2;
  align-items: center;
  height: 55px;
  

  .bar-title {
    display: flex;
    align-items: center;
  }

  .right-side {
    margin-left: auto;
  }

  .m-10 {
    margin-left: 10px;
  }
`,
]);

function Header({ title, children, background, backClickHandler }) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const onClickHandler = backClickHandler || goBack;

  return (
    <StyledHeader background={background || 'white'}>
      <div className="bar-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="m-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          width={25}
          height={25}
          onClick={onClickHandler}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <p className="title">{title}</p>
      </div>
      <div className="right-side">{children}</div>
    </StyledHeader>
  );
}

export default memo(Header);
