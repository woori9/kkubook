import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'twin.macro';

const Bar = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  max-width: 500px;
  height: 52px;
  display: flex;
  background-color: white;
  z-index: 3;
  p {
    align-self: center;
    font-size: 17px;
  }
`;

function Topbar(props) {
  const { title } = props;
  const navigate = useNavigate();

  return (
    <Bar>
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
    </Bar>
  );
}
export default Topbar;
