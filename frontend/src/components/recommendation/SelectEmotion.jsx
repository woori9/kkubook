import { useState, useEffect, useCallback } from 'react';
import tw, { styled } from 'twin.macro';
import InputBtn from '../survey/InputBtn';
import { getFeeling, submitFeeling } from '../../api/survey';
import useStoreFeelingBooks from '../../stores/recommend';
import { getFeelingBooks } from '../../api/recommend';

const ScrollEmotion = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 3rem;
  overflow-x: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  min-width: 720px;
`;

function SearchRecommend() {
  const [nowFeelingIdx, setFeelingIdx] = useState(null);
  const feelingList = [
    '💧  슬퍼요',
    '🛫 떠나고 싶어요',
    '💚 행복해요',
    '💤 무기력해요',
    '💬 심심해요',
    '💊 고민이 있어요',
  ];
  const storeFeelingBooks = useStoreFeelingBooks(
    useCallback(state => state.setBooks),
  );

  async function showDefaultFeeling() {
    const feelingIdx = await getFeeling();
    setFeelingIdx(feelingIdx);
    const currentSelected = document.getElementById(feelingList[feelingIdx]);
    currentSelected.classList.add('selected');
  }

  useEffect(() => {
    showDefaultFeeling();
  }, []);

  async function apiFeelingBooks() {
    const getBooks = await getFeelingBooks();
    return storeFeelingBooks(getBooks);
  }

  function changeFeeling(newFeelingIdx) {
    const prevSelected = document.querySelector('.selected');
    prevSelected.classList.remove('selected');
    setFeelingIdx(newFeelingIdx);
    const currentSelected = document.getElementById(feelingList[newFeelingIdx]);
    currentSelected.classList.add('selected');
    submitFeeling(newFeelingIdx);
    apiFeelingBooks();
  }

  return (
    <>
      <p>오늘 기분은 어떠신가요?</p>
      <ScrollEmotion>
        <BtnDiv>
          {feelingList.map(feeling => (
            <InputBtn
              key={feeling}
              id={feeling}
              onClick={() => changeFeeling(feelingList.indexOf(feeling))}
            >
              {feeling}
            </InputBtn>
          ))}
        </BtnDiv>
      </ScrollEmotion>
    </>
  );
}

export default SearchRecommend;
