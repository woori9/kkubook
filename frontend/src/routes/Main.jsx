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
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  arrows: false,
  initialSlide: 1,
  centerMode: true,
  centerPadding: '4%',
};

const GreenHeader = styled.header`
  ${tw`bg-main-green`}
  width: 100%;
  max-width: 500px;
  height: 30vh;
  position: absolute;

  .logo {
    width: 100px;
    height: 30px;
    margin: 0 auto;
    text-align: center;
    background-color: white;
  }

  .wrapper {
    padding: 0 1rem;
    position: relative;
    top: 10vh;
  }

  .text-white {
    color: white;
    font-size: 20px;
  }
`;

const StyledContent = styled.div`
  position: relative;
  top: 17vh;

  .content-wrapper {
    padding: 0 1rem;
  }
`;

function Main() {
  const books = useStore(
    useCallback(state => {
      return state.books.filter(book => book.status === 1);
    }),
  );
  const openBottomSheet = useBottomSheetStore(
    useCallback(state => state.openSheet),
  );

  // slider에는 padding이 들어가면 안된다.
  // slider를 감싼 요소가 fix면 slider css가 깨져서 greenHeader를 absolute로 설정
  return (
    <>
      <Navbar />
      <FabButton />
      <GreenHeader>
        <div className="logo"> Logo 위치 </div>
        <div className="wrapper">
          <p className="text-white">읽고 있는 책</p>
        </div>
      </GreenHeader>
      <StyledContent>
        {books.length ? (
          <Slider {...settings}>
            <Card>
              <button
                type="button"
                onClick={() => openBottomSheet(SearchList, '책 등록하기')}
              >
                책 추가하기
              </button>
            </Card>
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
        <div className="content-wrapper">
          <BookCommit />
        </div>
      </StyledContent>
    </>
  );
}

export default Main;
