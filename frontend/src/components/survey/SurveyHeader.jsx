import tw, { styled } from 'twin.macro';

const MainText = styled.p`
  ${tw`text-[20px] font-medium mb-4`}
`;

const SubText = styled.p`
  ${tw`text-[#848282] text-[15px]`}
`;

const Header = styled.header`
  ${tw`font-medium my-[1rem] text-center mt-[5rem]`}
`;

function SurveyHeader({ mainText, subText }) {
  return (
    <Header>
      <MainText>{mainText}</MainText>
      <SubText>{subText}</SubText>
    </Header>
  );
}

export default SurveyHeader;
