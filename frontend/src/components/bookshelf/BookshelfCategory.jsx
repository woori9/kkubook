import tw, { styled } from 'twin.macro';

const Button = styled.button(({ isSelected }) => [
  `background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    padding: 5px;
    border-top: 1px solid #a1a1a1;`,

  isSelected && tw`text-main-green border-main-green`,
]);

function BookshelfCategory({ category, isSelected, handleClick }) {
  return (
    <li>
      <Button
        isSelected={isSelected}
        type="button"
        onClick={() => handleClick(category)}
      >
        {category.name}
      </Button>
    </li>
  );
}

export default BookshelfCategory;
