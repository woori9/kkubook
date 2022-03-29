import { useNavigate } from 'react-router-dom';
import { styled } from 'twin.macro';
import useStore from '../../stores/bottomSheet';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 2vh;
`;

const ListEle = styled.div`
  padding: 2vh;
`;

function SearchList() {
  const navigate = useNavigate();
  const onDismiss = useStore(state => state.onDismiss);

  return (
    <Body>
      <ListEle
        onClick={() => {
          onDismiss();
          navigate('/searchbook');
        }}
      >
        <p>검색해서 등록하기</p>
      </ListEle>
      <ListEle
        onClick={() => {
          onDismiss();
          navigate('/scanbook');
        }}
      >
        <p>바코드로 등록하기</p>
      </ListEle>
      <ListEle
        onClick={() => {
          onDismiss();
          navigate('/recommendation');
        }}
      >
        <p>책 추천받기</p>
      </ListEle>
    </Body>
  );
}

export default SearchList;
