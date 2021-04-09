import { atom, selector } from 'recoil';
import { User } from '../types/User';

const notApplicable = 'N/A';

export const userState = atom<User>({
  key: 'USER',
  default: {
    id: notApplicable,
    email: notApplicable,
    name: notApplicable,
  },
});

export const getAuth = selector({
  key: 'USER_AUTHENTICATED',
  get: ({ get }) => {
    const _userState = get(userState);
    return _userState?.isAuthenticated;
  },
});

