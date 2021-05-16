import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { Profile } from '../types/Profile';
import { User } from '../types/User';
import {
  userCollection,
  profileCollection,
} from '../services/firebase/storage';
import { UserExtras } from '../types/UserExtras';
import { sleep } from '../util/async';

const notApplicable = 'N/A';

const defaultUserState = {
  id: notApplicable,
  email: notApplicable,
  name: notApplicable,
  phone: notApplicable,
  team: notApplicable,
  avatar: notApplicable,
  countryCode: 'SE',
};

export const defaultProfileState = {
  rank: 500,
  rankDelta: 'N/A' as number | 'N/A',
  wins: 0,
  losses: 0,
  draws: 0,
  recentMatches: [],
};

export const currentUserIDState = atom<string | null>({
  key: 'CURRENT_USER_ID',
  default: null,
});

export const userFirebaseState = atom<{ email: string } | null>({
  key: 'USER_FIREBASE',
  default: null,
});

export const userState = selector<User>({
  key: 'USER',
  get: async ({ get }) => {
    const id = get(currentUserIDState);
    if (id === null) return defaultUserState;

    const firebaseUser = get(userFirebaseState);
    if (firebaseUser === null) return defaultUserState;

    const extraData = await get(userExtraData({ id }));

    if (!extraData) {
      throw Error('Could not find a valid userstate.');
    }

    return {
      id,
      email: firebaseUser.email ?? notApplicable,
      avatar: extraData.avatar,
      countryCode: extraData.countryCode,
      name: extraData.name,
      phone: extraData.phone,
      team: extraData.team,
    };
  },
});

type userExtraDataParam = { id: string; onSignUp?: boolean };

export const userExtraData = atomFamily<UserExtras | null, userExtraDataParam>({
  key: 'USER_EXTRA_DATA',
  default: selectorFamily<UserExtras | null, userExtraDataParam>({
    key: 'USER_DATA/DEFAULT',
    get:
      ({ id, onSignUp }) =>
      async () => {
        if (onSignUp) {
          return null;
        }

        // Fixes a race condition on account creation
        while (!(await userCollection.has(id))) {
          await sleep(100);
        }

        return userCollection.get(id);
      },
  }),
});

export const profileState = selector<Profile>({
  key: 'REQUEST_PROFILE_SELECTOR',
  get: ({ get }) => {
    const user = get(userState);
    const profile = get(profileData(user.id));
    return profile;
  },
});

export const profileData = atomFamily<Profile, string>({
  key: 'PROFILE_DATA',
  default: selectorFamily<Profile, string>({
    key: 'USER_DATA/DEFAULT',
    get: (id) => () => profileCollection.get(id),
  }),
});

export const profileStatusState = atom<
  'idle' | 'pending' | 'fetching' | 'success' | 'fail'
>({
  key: 'PROFILE_STATUS',
  default: 'idle',
});
