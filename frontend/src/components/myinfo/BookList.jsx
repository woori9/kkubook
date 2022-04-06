/* eslint-disable react/jsx-props-no-spreading */
import { styled } from 'twin.macro';
import Slider from 'react-slick';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  draggable: true,
  arrows: false,
  initialSlide: 1,
};

const BookImg = styled.img`
  display: block;
  padding: 0 0.5rem 1rem 0.5rem;
`;

function BookList({ books }) {
  return (
    <Slider {...settings}>
      {books.map((book, idx) => (
        <BookImg src={book} alt="book" key={`${book}${idx + 1}`} />
      ))}
    </Slider>
  );
}

export default BookList;
