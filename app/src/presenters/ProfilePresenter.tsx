import React from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { profileCollection } from '../services/firebase/storage';
import { profileState, profileStatusState, userState } from '../state/user';
import { ProfileView } from '../views/ProfileView';

export const ProfileProvider = () => {
  const user = useRecoilValue(userState);
  const profileStatus = useRecoilValue(profileStatusState);

  const profileDetails = useRecoilCallback(({ set }) => async () => {
    set(profileStatusState, 'fetching');
    if (!user) {
      set(profileStatusState, 'fail');
      return;
    }

    let profile = undefined;
    try {
      profile = await profileCollection.get(user.id);
    } catch {
      /** Should probably should be a cloud function */
      set(profileStatusState, 'pending');
      profileCollection.set(user.id, {
        rank: 1500,
        rankDelta: 'N/A',
        wins: 0,
        losses: 0,
        draws: 0,
        recentMatches: [],
      });
    }

    if (profile === undefined) {
      set(profileStatusState, 'fetching');
      profile = await profileCollection.get(user.id);
    }

    set(profileStatusState, 'success');
    /* @ts-ignore */
    set(profileState, profile);
    return;
  });
  return (
    <ProfileView
      user={user}
      profileExists={profileStatus === 'success'}
      fetchDetails={profileDetails}
    />
  );
};
