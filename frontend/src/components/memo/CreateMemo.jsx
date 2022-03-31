import React, { useState, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from 'twin.macro';
import Header from '../common/Header';

const BarButton = styled.button`
  font-size: 17px;
  color: #848282;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
`;

const MemoForm = styled.div`
  padding: 1rem;
  padding-top: 4rem;
  width: 100%;
  height: 100%;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 20rem;
  margin-bottom: 1rem;
  :hover {
    opacity: 0.6;
  }

  .image-upload {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #a1a1a1;
    border-radius: 10px;

    #input-img {
      width: 50px;
    }
  }
  label {
    cursor: pointer;
  }
  input {
    display: none;
  }
  .image-preview {
    width: 100%;
    height: 100%;
    position: relative;

    .uploaded-image {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    #close-icon {
      position: absolute;
      right: 15px;
      top: 10px;
      cursor: pointer;
      width: 30px;
      height: 30px;
    }
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

function CreateMemo({ id, title, backClickHandler }) {
  const navigate = useNavigate();
  const location = useLocation();

  const bookId = id || location.state.id;
  const bookTitle = title || location.state.title;
  const [image, setImage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  function handleImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (event) {
        setImage(event.target.result);
        setIsUploaded(true);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  return (
    <>
      <Header title={bookTitle} backClickHandler={backClickHandler}>
        <BarButton>저장</BarButton>
      </Header>
      <MemoForm>
        <ImageBox>
          {!isUploaded ? (
            <>
              <label className="image-upload" htmlFor="upload-input">
                <svg
                  id="input-img"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="#a1a1a1"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
              />
            </>
          ) : (
            <div className="image-preview">
              <svg
                id="close-icon"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#848282"
                onClick={() => {
                  setIsUploaded(false);
                  setImage(null);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <img
                className="uploaded-image"
                src={image}
                alt="upload-img"
                draggable={false}
              />
            </div>
          )}
        </ImageBox>
        <TextBox>
          <textarea placeholder="메모를 작성해보세요" />
        </TextBox>
      </MemoForm>
    </>
  );
}

export default memo(CreateMemo);
