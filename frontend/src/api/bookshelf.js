import api from '../utils/apiInstance';
import { snakeToCamel } from '../utils/formatKey';
import getCurrentDate from '../utils/currentDate';

const getBooks = async () => {
  try {
    const { data } = await api.get('kkubooks/bookshelf/booklist/');
    return data.map(bookObj => snakeToCamel(bookObj));
  } catch (err) {
    return err;
  }
};

const addBook = async (bookId, userId) => {
  try {
    const { data } = await api.post('kkubooks/bookshelf/', {
      book: bookId,
      user: userId,
    });
    return snakeToCamel(data);
  } catch (err) {
    return err;
  }
};

const startReading = async (bookshelfId, bookId, userId, bookStatus) => {
  try {
    const body = {
      book: bookId,
      user: userId,
      book_status: 1,
    };

    if (bookStatus === 2) {
      body.start_date = getCurrentDate();
    }
    const { data } = await api.put(`kkubooks/bookshelf/${bookshelfId}/`, body);
    return snakeToCamel(data);
  } catch (err) {
    return err;
  }
};

const recordProgress = async (
  bookshelfId,
  bookId,
  userId,
  currPage,
  isCompleted,
  stopReading,
) => {
  try {
    const body = {
      book: bookId,
      user: userId,
      curr_page: currPage,
    };

    if (isCompleted) {
      body.book_status = 0;
      body.end_date = getCurrentDate();
    }

    if (stopReading) {
      body.book_status = 3;
    }

    const { data } = await api.put(`kkubooks/bookshelf/${bookshelfId}/`, body);
    return snakeToCamel(data);
  } catch (err) {
    return err;
  }
};

const commit = async (bookId, startTime) => {
  /*
    startTime: 읽기 페이지에 진입한 순간
    endTime: 저장하기 버튼을 누른 시점
    형식: 2022-04-01 11:23  (yyyy-mm-dd hh-min)
  */

  const endTime = getCurrentDate(true);
  try {
    const { data } = await api.post(`kkubooks/main/${bookId}/commit/`, {
      start_time: startTime,
      end_time: endTime,
    });

    return snakeToCamel(data);
  } catch (err) {
    return err;
  }
};

const deleteBook = async bookshelfId => {
  try {
    return await api.delete(`kkubooks/bookshelf/${bookshelfId}/`);
  } catch (err) {
    return err;
  }
};

export { getBooks, addBook, startReading, recordProgress, commit, deleteBook };
