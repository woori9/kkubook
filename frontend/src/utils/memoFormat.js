import { API_BASE_URL } from './apiInstance';

const memoFormat = obj => {
  const styledMemo = {
    book_info: obj.book_info,
    content: obj.content,
    created_at: obj.created_at,
    id: obj.id,
    is_img: obj.memo_img,
    memo_img: `${API_BASE_URL}${obj.memo_img}`,
    memo_mark: obj.memo_mark,
    updated_at: obj.updated_at,
  };
  return styledMemo;
};

export default memoFormat;
