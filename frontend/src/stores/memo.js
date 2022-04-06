import create from 'zustand';

const useStore = create(set => ({
  nowMemoId: '',
  setMemoId: newId =>
    set(state => ({
      nowMemoId: newId,
    })),
}));
export default useStore;
