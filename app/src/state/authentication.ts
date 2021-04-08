import { atom } from 'recoil';
import { UserCredentials } from '../types/UserCredentials';

export const loginCredentialsState = atom<UserCredentials | null>({
  key: 'LOGIN_CREDENTIALS',
  default: null,
});

export const loginStatusState = atom<'pending' | 'idle' | 'success' | 'fail'>({
  key: 'LOGIN_STATUS',
  default: 'idle',
});
