import { styled } from 'twin.macro';

const Content = styled.div(
  ({ repeat, buttonWidth, marginTop, paddingBottom }) => [
    `
    width: 90%;
    position: relative;
    margin-top: ${marginTop};
    padding-bottom: ${paddingBottom};

    .grid-box {
      display: grid;
      justify-items: center;
      background-color: white;
      grid-template-columns: repeat(${repeat}, 1fr);
    }

    .input-btn {
      width: ${buttonWidth};
    }
  `,
  ],
);

function SurveyContent({
  children,
  repeat,
  buttonWidth,
  marginTop,
  paddingBottom,
}) {
  return (
    <Content
      repeat={repeat}
      buttonWidth={buttonWidth}
      marginTop={marginTop}
      paddingBottom={paddingBottom || '0rem'}
    >
      <div className="grid-box">{children}</div>
    </Content>
  );
}

export default SurveyContent;
