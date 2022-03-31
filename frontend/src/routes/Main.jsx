/* eslint-disable react/jsx-props-no-spreading */
import tw, { styled } from 'twin.macro';
import { useCallback } from 'react';
import Slider from 'react-slick';
import Navbar from '../components/common/Navbar';
import FabButton from '../components/common/FabButton';
import Card from '../components/main/Card';
import MainBook from '../components/main/MainBook';
import BookCommit from '../components/main/BookCommit';
import SearchList from '../components/main/SearchList';
import useStore from '../stores/book';
import useBottomSheetStore from '../stores/bottomSheet';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  arrows: false,
};

const StyledBox = styled.div`
  ${tw`bg-main-green`}
  width: 100%;
  max-width: 500px;
  height: 30vh;
  position: fixed;

  .logo {
    width: 100px;
    height: 30px;
    margin: 0 auto;
    text-align: center;
    background-color: white;
  }
`;

const StyledMain = styled.div`
  padding: 0 1rem;
  position: relative;
  top: 15vh;

  .text-white {
    color: white;
    font-size: 20px;
  }
`;

function Main() {
  const books = useStore(
    useCallback(state => {
      return state.books.filter(book => book.status === 1);
    }),
    [],
  );
  const openBottomSheet = useBottomSheetStore(
    useCallback(state => state.openSheet),
  );

  return (
    <>
      <Navbar />
      <FabButton />
      <StyledBox>
        <div className="logo"> Logo 위치 </div>
      </StyledBox>
      <StyledMain>
        <p className="text-white">읽고 있는 책</p>
        {books.length ? (
          <Slider {...settings}>
            {books.map(book => (
              <Card key={book.id}>
                <MainBook book={book} />
              </Card>
            ))}
          </Slider>
        ) : (
          <Card>
            <button
              type="button"
              onClick={() => openBottomSheet(SearchList, '책 등록하기')}
            >
              아직 읽고 있는 책이 없어요. 책 추가하기
            </button>
          </Card>
        )}
        <BookCommit />
        <button
          type="button"
          onClick={() => openBottomSheet(SearchList, '책 등록하기')}
        >
          책 추가하기
        </button>
      </StyledMain>
    </>
  );
}

export default Main;
