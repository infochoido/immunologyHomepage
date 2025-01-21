import { create } from 'zustand';

const useBoardStore = create((set) => ({
  title: '',
  content: '',
  boardImageList: [],
  setTitle: (title) => set((state) => ({ ...state, title })),
  setBoardImageList: (boardImageList) => set((state) => ({ ...state, boardImageList })),
  setContent: (content) => set((state) => ({ ...state, content })),  
  resetBoard: () => set(() => ({ title: '', content: '' })),
}));

export { useBoardStore };


const useLoginuserStore = create((set) => ({
  loginuser: {},  // 기본값을 빈 객체로 설정
  setLoginuser: (loginuser) => set(() => ({ loginuser })),
  resetLoginuser: () => set(() => ({ loginuser: {} })),  // 상태 초기화
}));

export { useLoginuserStore };