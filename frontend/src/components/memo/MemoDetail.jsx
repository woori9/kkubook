import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from 'twin.macro';
import useBottomSheetStore from '../../stores/bottomSheet';
import useStoreMemo from '../../stores/memo';
import DeleteMemo from './DeleteMemo';
import { apiPutMemo } from '../../api/memo';

const Bar = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  max-width: 500px;
  height: 52px;
  background-color: white;
  z-index: 3;
  display: flex;
  justify-content: space-between;

  .bar-title {
    display: flex;

    p {
      align-self: center;
      font-size: 17px;
    }
  }
  .bar-button {
    display: flex;
    button {
      padding-right: 1rem;
      font-size: 17px;
      color: #848282;
      border: none;
      background-color: #ffffff;
      cursor: pointer;
    }
    #delete-btn {
      color: #ff5858;
    }
  }
`;

const MemoForm = styled.div`
  dispaly: flex;
  flex-directin: column;
  padding: 1rem;
  padding-top: 4rem;
  padding-bottom: 5rem;
  border-radius: 20px;
  min-height: 10rem;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 20rem;
  margin-bottom: 1rem;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const TextBox = styled.div`
  width: 100%;
  height: 20rem;
  textarea {
    padding: 1rem;
    line-height: 1.5rem;
    background-color: #f2f2f2;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    border: none;
    resize: none;
    outline: none;
  }
`;

function MemoDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const { id, title, content, is_img, memo_img } = location.state.memo;
  const [text, setText] = useState(content);

  const openBottomSheet = useBottomSheetStore(
    useCallback(state => state.openSheet),
  );

  const setMemoId = useStoreMemo(useCallback(state => state.setMemoId));

  function putMemo() {
    const reqData = {
      content: text,
    };
    apiPutMemo({ memo_id: id }, reqData);
    navigate('/memo');
  }

  useEffect(() => {
    setMemoId(id);
  });

  return (
    <>
      <Bar>
        <div className="bar-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            width="29px"
            onClick={() => navigate(-1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <p>{title}</p>
        </div>
        <div className="bar-button">
          <button
            id="delete-btn"
            type="button"
            onClick={() =>
              openBottomSheet(DeleteMemo, '메모를 삭제하시겠습니까?')
            }
          >
            삭제
          </button>
          <button type="button" onClick={() => putMemo()}>
            수정
          </button>
        </div>
      </Bar>
      <MemoForm>
        {is_img !== null ? (
          <ImageBox>
            <img src={memo_img} alt="memo-img" draggable={false} />
          </ImageBox>
        ) : null}
        <TextBox>
          <textarea
            defaultValue={content}
            onChange={event => setText(event.target.value)}
          />
        </TextBox>
      </MemoForm>
    </>
  );
}

export default MemoDetail;
