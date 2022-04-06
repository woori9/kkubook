import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './routes/Intro';
import Survey from './routes/Survey';
import Main from './routes/Main';
import Memo from './routes/Memo';
import MyInfo from './routes/MyInfo';
import Settings from './routes/Settings';
import Signout from './routes/Signout';
import Reading from './routes/Reading';
import Congratulations from './routes/Congratulations';
import Bookshelf from './routes/Bookshelf';
import Recommendation from './routes/Recommendation';
import SearchBook from './components/main/SearchBook';
import ScanBook from './components/main/ScanBook';
import BookDetail from './components/main/BookDetail';
import KakaoRedirectHandler from './routes/KakaoRedirectHandler';
import BottomSheetBase from './components/common/BottomSheetBase';
import CreateMemo from './components/memo/CreateMemo';
import MemoDetail from './components/memo/MemoDetail';
import SearchMemo from './components/memo/SearchMemo';
import BookshelfBook from './routes/BookshelfBook';
import Review from './routes/Review';
import Page404 from './routes/NotFound';
import PrivateRoute from './routes/PrivateRoute';
import useStore from './stores/user';

function App() {
  const userId = useStore(state => state.userInfo.userId);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/intro" element={<Intro />} />
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler />}
        />
        <Route element={<PrivateRoute isLoggedIn={userId} />}>
          <Route path="/survey" element={<Survey />} />
          <Route path="/" element={<Main />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
          <Route path="/bookshelf/book" element={<BookshelfBook />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/creatememo" element={<CreateMemo />} />
          <Route path="/searchmemo" element={<SearchMemo />} />
          <Route path="/memo/:memoId" element={<MemoDetail />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="/myinfo/settings" element={<Settings />} />
          <Route path="/myinfo/settings/signout" element={<Signout />} />
          <Route path="/searchbook" element={<SearchBook />} />
          <Route path="/scanbook" element={<ScanBook />} />
          <Route path="/bookDetail/:bookId" element={<BookDetail />} />
          <Route
            path="/congratulations/:bookStatus"
            element={<Congratulations />}
          />
          <Route path="/review" element={<Review />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <BottomSheetBase />
    </BrowserRouter>
  );
}

export default App;
