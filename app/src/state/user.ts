import { atom } from 'recoil';
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
