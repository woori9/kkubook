import React, { useRef } from 'react';
import tw, { styled } from 'twin.macro';
import useStore from '../../stores/bottomSheet';
import { selectedBookStore } from '../../stores/book';
import blockInvalidChar from '../../utils/validation';

const StyledPageInput = styled.div`
  width: 90%;
  margin: 0 auto 15px;

  input {
    width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
    font-size: 16px;
    margin: 1rem 0rem;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    ${tw`text-main-gray`}
  }

  button {
    border-radius: 10px;
    border: 0;
    outline: 0;
  }

  .submit-button {
    ${tw`bg-main-green`}
    width: 100%;
    height: 2.5rem;
  }

  .options {
    width: 120px;
    height: 5rem;
    position: absolute;
    z-index: 4;
    top: -90px;
    right: 10px;
  }

  .option-button {
    border-radius: 6px;
    width: 100%;
    height: 30px;
    margin: 5px 0px;
  }

  .done {
    ${tw`bg-main-green`}
  }

  .stop {
    ${tw`bg-light-gray`}
  }

  .button-content {
    display: flex;
  }

  .mt-10 {
    ${tw`text-main-gray`}
    margin-top: 10px;
    font-size: 15px;
  }
`;

function PageInput() {
  const inputRef = useRef();
  const hideBottomSheet = useStore(state => state.onDismiss);
  const selectedBook = selectedBookStore(state => state.selectedBook);
  const submitPage = useStore(state => state.onSubmit);

  return (
    <StyledPageInput>
      <p className="mt-10">
        0 ~ {selectedBook.bookInfo.page} 사이의 숫자를 입력해주세요
      </p>
      <input type="number" ref={inputRef} onKeyDown={blockInvalidChar} />
      <button
        type="button"
        className="submit-button"
        onClick={() => {
          submitPage(inputRef.current.value);
        }}
      >
        기록완료
      </button>
      <div className="options">
        <button
          type="button"
          className="option-button done"
          onClick={() => {
            submitPage('done');
            hideBottomSheet();
          }}
        >
          <div className="button-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width={20}
              height={20}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p>다 읽었어요!</p>
          </div>
        </button>
        <button
          type="button"
          className="option-button stop"
          onClick={() => submitPage('stop')}
        >
          <div className="button-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width={20}
              height={20}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            <p>그만 읽을래요.</p>
          </div>
        </button>
      </div>
    </StyledPageInput>
  );
}

export default PageInput;
