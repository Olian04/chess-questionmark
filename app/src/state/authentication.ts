import { atom, selector } from 'recoil';
import { UserCredentials } from '../types/UserCredentials';
import { userState } from './user';

export const loginCredentialsState = atom<UserCredentials | null>({
  key: 'LOGIN_CREDENTIALS',
  default: null,
});

const logger = selector({
  key: 'LOGGER',
  get: ({ get }) => {
    const user = get(userState);
    const status = get(loginStatusState);
    console.log('LOG:', user, status);
  },
});

export const loginStatusState = atom<'pending' | 'idle' | 'success' | 'fail'>({
  key: 'LOGIN_STATUS',
  default: 'idle',
});
