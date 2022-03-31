import styled from 'styled-components';

const StyledButton = styled.button(
  ({ background, color, size, width, padding }) => `
  border: none;
  text-align: center;
  cursor: pointer;
  width: ${width};
  padding: ${padding};
  border-radius: 10px;
  font-size: ${size};
  background-color: ${background};
  color: ${color};
  `,
);

function Button({ onClick, size, background, color, title, width, padding }) {
  return (
    <StyledButton
      onClick={onClick}
      size={size || '15px'}
      background={background || '#8dcd84'}
      color={color || 'white'}
      width={width || '100%'}
      padding={padding || '10px'}
    >
      {title}
    </StyledButton>
  );
}

export default Button;
