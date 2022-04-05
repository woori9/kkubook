import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getBooklist } from '../api/main';
import { getBooks, getMemoList } from '../api/bookshelf';

const useStore = create((set, get) => ({
  // main
  mainbooks: [],
  firstCardIndex: 1,
  setCardIndex: index => {
    return set({ firstCardIndex: index });
  },
  getMainBooks: async () => {
    const books = await getBooklist();
    return set({ mainbooks: books });
  },
  // bookshelf
  bookshelf: [],
  category: 0,
  setCategory: category => {
    return set({ category });
  },
  getBooklist: async () => {
    const books = await getBooks();
    return set({ bookshelf: books });
  },
}));

const selectedBookStore = create(
  persist(
    (set, get) => ({
      selectedBook: null,
      setSelectedBook: book => {
        return set({ selectedBook: book });
      },
      memos: [],
      getMemos: async () => {
        const memos = await getMemoList();
        return set({ memos });
      },
    }),
    {
      name: 'book-storage',
      getStorage: () => sessionStorage,
    },
  ),
);

export default useStore;
export { selectedBookStore };
