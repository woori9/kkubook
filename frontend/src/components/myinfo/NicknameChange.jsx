/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import userStore from '../../stores/user';
import bottomSheetStore from '../../stores/bottomSheet';
import { changeNickname } from '../../api/user';

const FormDiv = styled.div`
  ${tw`flex flex-col justify-center items-center`}
`;

const Form = styled.form`
  ${tw`mb-[1rem]`}
  width: 80%;
  padding: 0 5px;

  input {
    width: 100%;
    height: 2.5rem;
    padding: 0;
    margin: 0.5rem 0;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #000;
  }

  input:focus {
    outline: none;
  }

  .alert-text {
    color: red;
    font-size: 12px;
    height: 0.75rem;
  }

  button {
    width: 100%;
    height: 2.5rem;
    padding: 0;
    margin: 0.5rem 0;
    border-radius: 10px;
    border: 0;
    font-size: 15px;
  }

  .submit-btn {
    ${tw`bg-main-green`}
    color: #fff;
  }

  .cancel-btn {
    ${tw`bg-light-gray`}
    color: #000;
  }
`;

function NicknameChange() {
  const { userInfo, updateUserInfo } = userStore();
  const onDismiss = bottomSheetStore(state => state.onDismiss);
  const [value, setValue] = useState(userInfo.nickname);
  const [isPossible, setIsPossible] = useState(true);
  const [impossibleMessage, setImpossibleMessage] = useState('');

  function handleInputChange(event) {
    const reg = /[\s`~!@#$%^&*=+|\\'"{}[\]<>;:/?]/gi;
    const userValue = event.target.value;
    if (reg.test(userValue)) {
      setIsPossible(false);
      setImpossibleMessage('공백 또는 특수문자는 입력할 수 없습니다.');
    } else {
      setIsPossible(true);
    }
    setValue(userValue);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isPossible) return;
    changeNickname(
      value,
      response => {
        updateUserInfo({ nickname: response.data.nickname });
        onDismiss();
      },
      error => console.log(error),
    );
  }

  return (
    <FormDiv>
      <Form onSubmit={event => handleSubmit(event)}>
        <input
          type="text"
          maxLength="30"
          autoFocus
          value={value}
          onChange={event => handleInputChange(event)}
        />
        {isPossible ? (
          <p className="alert-text" />
        ) : (
          <p className="alert-text">{impossibleMessage}</p>
        )}

        <button type="submit" className="submit-btn">
          수정
        </button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => onDismiss()}
        >
          취소
        </button>
      </Form>
    </FormDiv>
  );
}

export default NicknameChange;
