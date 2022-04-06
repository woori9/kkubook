import create from 'zustand';

const useStore = create(set => ({
  books: [],
  setBooks: newBooks =>
    set(state => ({
      books: newBooks,
    })),
}));
export default useStore;
