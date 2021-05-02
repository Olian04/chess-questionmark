import { atom, selector, selectorFamily } from 'recoil';
import { Profile } from '../types/Profile';
import { User } from '../types/User';
import { auth, getCurrentUser } from '../services/firebase/auth';
import {
  userCollection,
  getStorageGameByID,
  profileCollection,
} from '../services/firebase/storage';
import { StorageGameLocal } from '../types/storage/StorageGame';
import { loginStatusState } from './authentication';

const notApplicable = 'N/A';

export const defaultUserState = {
  id: notApplicable,
  email: notApplicable,
  name: notApplicable,
  phone: notApplicable,
  team: notApplicable,
  avatar: notApplicable,
  countryCode: 'SE',
};

export const defaultProfileState = {
  rank: 1500,
  rankDelta: 'N/A' as number | 'N/A',
  wins: 0,
  losses: 0,
  draws: 0,
  recentMatches: [],
};

export const userState = atom<User>({
  key: 'USER',
  default: defaultUserState,
});

export const userHydrateState = selector<User>({
  key: 'USER_ASYNC',
  get: async ({ get }) => {
    const state = get(userState);
    if (state.id !== notApplicable && state.avatar !== notApplicable)
      return state;

    const maybeUser = await getCurrentUser();

    if (maybeUser) {
      const extras = await userCollection.get(maybeUser.uid);
      return {
        id: maybeUser.uid,
        email: maybeUser.email,
        name: extras.name,
        phone: extras.phone,
        team: extras.team,
        avatar: extras.avatar,
        countryCode: extras.countryCode,
      } as User;
    }

    return defaultUserState;
  },
  set: ({ set }, newValue) => {
    set(userState, newValue);
  },
});

export const profileState = atom<Profile>({
  key: 'PROFILE',
  default: defaultProfileState,
});

export const requestProfile = atom<Profile>({
  key: 'REQUEST_PROFILE',
  default: selector<Profile>({
    key: 'REQUEST_PROFILE_SELECTOR',
    get: async ({ get }) => {
      const user = await get(userHydrateState);
      const profile = await profileCollection.get(user.id);
      console.warn(user, profile);
      return profile ?? defaultProfileState;
    },
    set: ({ set }, newValue) => {
      set(requestProfile, newValue);
    },
  }),
});

export const profileStatusState = atom<
  'idle' | 'pending' | 'fetching' | 'success' | 'fail'
>({
  key: 'PROFILE_STATUS',
  default: 'idle',
});
