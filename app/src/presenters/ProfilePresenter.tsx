import React, { useEffect } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { profileCollection } from '../services/firebase/storage';
import { profileState, profileStatusState, userState } from '../state/user';
import { Profile } from '../types/Profile';
import { ProfileView } from '../views/ProfileView';

export const ProfilePresenter = () => {
  const _user = useRecoilValue(userState);
  const profile = useRecoilValue(profileState);

  const profileDetails = useRecoilCallback(({ snapshot, set }) => async () => {
    const profile = await snapshot.getPromise(profileState);

    set(profileState, profile);
  });

  useEffect(() => {
    profileDetails();
  }, []);
  return <ProfileView user={_user} profile={profile} />;
};
