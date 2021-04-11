import { atom, selector } from 'recoil';
import { UserCredentials } from '../types/UserCredentials';
import { profileState, userState } from './user';

export const loginCredentialsState = atom<UserCredentials | null>({
  key: 'LOGIN_CREDENTIALS',
  default: null,
});

export const loginStatusState = atom<'pending' | 'idle' | 'success' | 'fail'>({
  key: 'LOGIN_STATUS',
  default: 'idle',
});
