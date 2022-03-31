import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './routes/Intro';
import Main from './routes/Main';
import Memo from './routes/Memo';
import MyInfo from './routes/MyInfo';
import Settings from './routes/Settings';
import Signout from './routes/Signout';
import Reading from './routes/Reading';
import Bookshelf from './routes/Bookshelf';
import Recommendation from './routes/Recommendation';
import SearchRecommend from './components/recommendation/SearchRecommend';
import SearchBook from './components/main/SearchBook';
import ScanBook from './components/main/ScanBook';
import BookDetail from './components/main/BookDetail';
import KakaoRedirectHandler from './routes/KakaoRedirectHandler';
import BottomSheetBase from './components/common/BottomSheetBase';
import CreateMemo from './components/memo/CreateMemo';
import MemoDetail from './components/memo/MemoDetail';
import SearchMemo from './components/memo/SearchMemo';
import BookshelfBook from './routes/BookshelfBookDetail';
import Page404 from './routes/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/intro" element={<Intro />} />
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler />}
        />
        <Route path="/" element={<Main />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
        <Route path="/bookshelf/book/:bookId" element={<BookshelfBook />} />
        <Route path="/memo" element={<Memo />} />
        <Route path="/creatememo" element={<CreateMemo />} />
        <Route path="/searchmemo" element={<SearchMemo />} />
        <Route path="/memo/:memoId" element={<MemoDetail />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/searchkeyword" element={<SearchRecommend />} />
        <Route path="/myinfo" element={<MyInfo />} />
        <Route path="/myinfo/settings" element={<Settings />} />
        <Route path="/myinfo/settings/signout" element={<Signout />} />
        <Route path="/searchbook" element={<SearchBook />} />
        <Route path="/scanbook" element={<ScanBook />} />
        <Route path="/bookDetail/:bookId" element={<BookDetail />} />
        <Route path="/reading/:bookId" element={<Reading />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <BottomSheetBase />
    </BrowserRouter>
  );
}

export default App;
