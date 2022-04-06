/* eslint-disable react/jsx-props-no-spreading */
import tw, { styled } from 'twin.macro';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Slider from 'react-slick';
import Navbar from '../components/common/Navbar';
import FabButton from '../components/common/FabButton';
import Card from '../components/main/Card';
import MainBook from '../components/main/MainBook';
import BookCommit from '../components/main/BookCommit';
import SearchList from '../components/main/SearchList';
import useBookStore, { selectedBookStore } from '../stores/book';
import useBottomSheetStore from '../stores/bottomSheet';
import { getBookCommit } from '../api/main';
import transparentKKubook from '../assets/transparent-kkubook.png';
import logo from '../assets/kkubook-logo.png';

const GreenHeader = styled.header`
  ${tw`bg-main-green`}
  width: 100%;
  max-width: 500px;
  height: 30vh;
  position: absolute;

  .logo {
    display: block;
    width: auto;
    height: 50px;
    margin: 2.5rem auto;
  }
`;

const StyledContent = styled.div`
  position: relative;
  top: 16vh;
  overflow: auto;

  .content-wrapper {
    padding: 0 1rem;
  }

  .main-title {
    color: white;
    font-size: 20px;
    margin: 0.5rem 1.5rem;
  }

  button {
    ${tw`text-dark-gray`}
    outline: none;
    border: none;
    background: none;
  }

  .add-book-btn {
    ${tw`flex flex-col justify-center items-center`}
  }

  .kkubook-img {
    width: 40%;
    margin: 10px auto;
  }

  .kakao-button {
    width: 200px;
  }
`;

function Main() {
  const mainBooks = useBookStore(state => state.mainbooks);
  const getMainBooks = useBookStore(state => state.getMainBooks);
  const [isLoading, setLoading] = useState(true);
  const [commits, setCommits] = useState([]);
  const openBottomSheet = useBottomSheetStore(
    useCallback(state => state.openSheet),
  );
  const cardIndex = useBookStore(state => state.firstCardIndex);
  const setCardIndex = useBookStore(state => state.setCardIndex);
  const selectBook = selectedBookStore(state => state.setSelectedBook);
  const centerPadding = mainBooks.length ? '4%' : '0%';

  const sliderSetting = useMemo(
    () => ({
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      arrows: false,
      initialSlide: cardIndex,
      centerMode: true,
      centerPadding,
    }),
    [cardIndex, centerPadding],
  );

  useEffect(() => {
    async function getCommits() {
      const resData = await getBookCommit();
      setCommits(resData);
      setLoading(false);
    }
    getCommits();
    getMainBooks();

    if (cardIndex >= mainBooks.length) {
      setCardIndex(1);
    }
  }, []);

  useEffect(() => {
    const initKakao = () => {
      if (window.Kakao) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
          kakao.init(process.env.REACT_APP_JS_KEY);
        }

        kakao.Channel.createAddChannelButton({
          container: '#kakao-talk-channel-add-button',
        });
      }
    };
    initKakao();

    return () => window.Kakao.Channel.cleanup();
  }, []);

  // slider에는 padding이 들어가면 안된다.
  // slider를 감싼 요소가 fix면 slider css가 깨져서 greenHeader를 absolute로 설정
  return (
    <>
      <Navbar />
      <FabButton />
      <GreenHeader>
        <img src={logo} className="logo" alt="kkubook logo" />
      </GreenHeader>
      <StyledContent>
        <p className="main-title">읽고 있는 책</p>
        <Slider {...sliderSetting}>
          <Card wrapperPadding={!mainBooks.length && '1rem'}>
            <button
              type="button"
              className="add-book-btn"
              onClick={() => openBottomSheet(SearchList, '책 등록하기')}
            >
              <img
                className="kkubook-img"
                src={transparentKKubook}
                alt="transparent-kkubook"
              />
              {mainBooks.length ? '읽을 책 추가하기' : '책 추가하기'}
            </button>
          </Card>
          {mainBooks.map((book, index) => (
            <Card key={book.id}>
              <MainBook
                book={book}
                index={index}
                selectBook={selectBook}
                setCardIndex={setCardIndex}
              />
            </Card>
          ))}
        </Slider>
        {isLoading ? null : (
          <div className="content-wrapper">
            <BookCommit values={commits} />
          </div>
        )}
        <div className="content-wrapper">
          <div
            className="kakao-button"
            id="kakao-talk-channel-add-button"
            data-channel-public-id="_xcsqNb"
            data-size="small"
            data-support-multiple-densities="true"
          />
        </div>
      </StyledContent>
    </>
  );
}

export default Main;
