import React from 'react';
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

  input {
    width: 100%;
    height: 2.5rem;
    padding: 0;
    margin: 0.5rem 5px;
    border: 0;
    border-bottom: 1px solid #000;
  }

  input:focus {
    outline: none;
  }

  button {
    width: 100%;
    height: 2.5rem;
    padding: 0;
    margin: 0.5rem 5px;
    border-radius: 10px;
    border: none;
    font-size: 15px;
  }

  .submit-btn {
    ${tw`bg-light-gray`}
  }

  .cancel-btn {
    ${tw`bg-main-green`}
    color: white;
  }
`;

function NicknameChange() {
  const { userInfo, changeUserNickname } = userStore();
  const onDismiss = bottomSheetStore(state => state.onDismiss);
  const [value, setValue] = React.useState(userInfo.nickname);

  function handleInputChange(event) {
    const userValue = event.target.value;
    setValue(userValue);
  }

  function handleSubmit(event) {
    event.preventDefault();
    changeNickname(
      value,
      response => {
        changeUserNickname(response.data.nickname);
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
          value={value}
          onChange={event => handleInputChange(event)}
        />
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
