import { create } from 'zustand';

const useBoardStore = create((set) => ({
  title: '',
  content: '',
  category:'',
  boardImageList: [],
  setTitle: (title) => set((state) => ({ ...state, title })),
  setBoardImageList: (boardImageList) => set((state) => ({ ...state, boardImageList })),
  setContent: (content) => set((state) => ({ ...state, content })),  
  setCategory:(category)=>set((state)=>({ ...state, category })),
  resetBoard: () => set(() => ({ title: '', content: '', category:'' })),
}));

export { useBoardStore };


const useLoginuserStore = create((set) => ({
  loginuser: {},  // 기본값을 빈 객체로 설정
  setLoginuser: (loginuser) => set(() => ({ loginuser })),
  resetLoginuser: () => set(() => ({ loginuser: {} })),  // 상태 초기화
}));

export { useLoginuserStore };