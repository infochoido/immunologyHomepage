import { atom } from 'recoil';

// 사용자 닉네임을 저장하는 Recoil 상태
export const RecoiluserNameState = atom({
  key: 'userNameState', // 상태를 구분하기 위한 고유 키
  default: '', // 기본값 (빈 문자열)
});
