import { atom, selector } from 'recoil';
import { User } from '../types/User';
import { UserCredentials } from '../types/UserCredentials';
import { loginUser } from '../services/firebase/auth';

export const userCredentials = atom<UserCredentials | null>({
  key: 'USER_CREDENTIALS',
  default: null,
});

export const userState = atom<User | null>({
  key: 'USER',
  default: null,
});

export const getAuth = selector({
  key: 'USER_AUTHENTICATED',
  get: ({ get }) => {
    const _userState = get(userState);
    return _userState?.isAuthenticated;
  },
});

export const userData = selector<User>({
  key: 'USER_DATA',
  get: ({ get }) => {
    const credentials = get(userCredentials);
    if (credentials === null)
      return {
        isAuthenticated: false,
        email: '',
        id: '',
        name: '',
      };

    return loginUser(credentials);
  },
});
