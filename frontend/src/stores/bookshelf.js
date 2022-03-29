import create from 'zustand';
import bookshelfCategories from '../constants/bookShelf';

const useStore = create((set, get) => ({
  selectedCategory: bookshelfCategories[0],
  setSelectedCategory: category => {
    return set({ selectedCategory: category });
  },
}));

export default useStore;
