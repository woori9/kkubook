/* eslint-disable react/jsx-props-no-spreading */
import { styled } from 'twin.macro';
import Slider from 'react-slick';
import BookResult from './BookResult';

const Category = styled.div`
  padding-bottom: 1rem;
  p {
    font-size: 25px;
    padding-bottom: 1rem;
  }
`;

function RecommendCategory({ title, books }) {
  const getTitle = title;
  const getBooks = books;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    arrows: false,
  };

  return (
    <Category>
      <p>{getTitle}</p>
      <Slider {...settings}>
        {getBooks.map(book => (
          <BookResult key={book.id} book={book} />
        ))}
      </Slider>
    </Category>
  );
}

export default RecommendCategory;
