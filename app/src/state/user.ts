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

const notApplicable = 'N/A';

export const defaultUserState = {
  id: notApplicable,
  email: notApplicable,
  name: notApplicable,
  phone: notApplicable,
  team: notApplicable,
  avatar: notApplicable,
};

export const defaultProfileState = {
  rank: -1,
  rankDelta: 'N/A' as number | 'N/A',
  wins: -1,
  losses: -1,
  draws: -1,
  recentMatches: [],
};

export const userState = atom<User>({
  key: 'USER',
  default: selector({
    key: 'USER/DEFAULT',
    get: async () => {
      const maybeUser = await getCurrentUser();
      if (maybeUser === null) return defaultUserState;
      const extras = await userCollection.get(maybeUser.uid);
      return {
        id: maybeUser.uid,
        name: extras.name as string,
        email: maybeUser.email as string,
        phone: extras?.phone ?? (notApplicable as string),
        team: extras?.team ?? (notApplicable as string),
        avatar: extras?.avatar ?? (notApplicable as string),
      };
    },
  }),
});

export const profileState = atom<Profile>({
  key: 'PROFILE',
  default: selector({
    key: 'PROFILE/DEFAULT',
    get: async ({ get }) => {
      const user = get(userState);
      const profileData = await profileCollection.get(user.id);

      if (profileData) {
        return profileData;
      }

      await profileCollection.set(user.id, defaultProfileState);
      return defaultProfileState;
    },
  }),
});

export const profileStatusState = atom<
  'idle' | 'pending' | 'fetching' | 'success' | 'fail'
>({
  key: 'PROFILE_STATUS',
  default: 'idle',
});
