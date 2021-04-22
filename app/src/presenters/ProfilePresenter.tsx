import React, { useEffect } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { profileCollection } from '../services/firebase/storage';
import {
  profileState,
  profileStatusState,
  userHydrateState,
  userState,
} from '../state/user';
import { Profile } from '../types/Profile';
import { ProfileView } from '../views/ProfileView';

export const ProfilePresenter = () => {
  const user = useRecoilValue(userHydrateState);
  const [profile, setProfile] = useRecoilState(profileState);

  /*
  const profileDetails = useRecoilCallback(({ snapshot, set }) => async () => {
    const user = await snapshot.getPromise(userState);
    profileCollection.observe(user.id, (profile) => {
      set(profileState, profile);
    });
  });
  */

  const hydrateProfile = () => {
    if (user) {
      return profileCollection.observe(user.id, (profile) =>
        setProfile(profile)
      );
    }
  };

  useEffect(() => {
    const unsubscribe = hydrateProfile();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return <ProfileView user={user} profile={profile} />;
};
