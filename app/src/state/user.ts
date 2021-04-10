import { atom, selector } from 'recoil';
import { Profile } from '../types/Profile';
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

export const profileState = atom<Profile>({
  key: 'PROFILE',
  default: {
    rank: -1,
    rankDelta: -1,
    wins: -1,
    losses: -1,
    draws: -1,
    recentMatches: [],
  },
});
