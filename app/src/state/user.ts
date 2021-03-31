import { atom, selector } from 'recoil';
import { User } from '../types/User';
import { UserCredentials } from '../types/UserCredentials';
import { loginUser } from '../services/firebase/auth';

export const userCredentials = atom<UserCredentials | null>({
  key: 'USER_CREDENTIALS',
  default: null,
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
