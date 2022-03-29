import tw, { styled } from 'twin.macro';
import Header from '../components/common/Header';

const StyledNotFound = styled.div`
  margin: 0 auto;
  padding: 50px;
`;

function NotFound() {
  return <StyledNotFound>요청하신 페이지를 찾을 수 없습니다.</StyledNotFound>;
}

export default NotFound;
