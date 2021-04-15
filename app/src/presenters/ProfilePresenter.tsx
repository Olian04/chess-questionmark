import React, { useEffect } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { profileCollection } from '../services/firebase/storage';
import { profileState, profileStatusState, userState } from '../state/user';
import { ProfileView } from '../views/ProfileView';

export const ProfileProvider = () => {
  const _user = useRecoilValue(userState);

  const profileStatus = useRecoilValue(profileStatusState);
  const profile = useRecoilValue(profileState);

  const profileDetails = useRecoilCallback(({ snapshot, set }) => async () => {
    const user = await snapshot.getPromise(userState);

    set(profileStatusState, 'fetching');
    if (!user) {
      set(profileStatusState, 'fail');
      return;
    }

    const profile = await profileCollection.get(user.id);
    if (!profile && user.id !== 'N/A') {
      set(profileStatusState, 'pending');
      const newProfile = {
        rank: 1500,
        rankDelta: 'N/A',
        wins: 0,
        losses: 0,
        draws: 0,
        recentMatches: [],
      };

      await profileCollection.set(user.id, newProfile);
      set(profileStatusState, 'success');
      set(profileState, newProfile);
      return;
    }

    set(profileStatusState, 'success');
    set(profileState, profile);
    return;
  });

  useEffect(() => {
    profileDetails();
  }, []);
  return <ProfileView user={_user} profile={profile} />;
};
