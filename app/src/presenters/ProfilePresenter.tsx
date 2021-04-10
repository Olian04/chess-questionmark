import React from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { userState } from '../state/user';
import { ProfileView } from '../views/ProfileView';

export const ProfileProvider = () => {
  const user = useRecoilValue(userState);

  const profileDetails = useRecoilCallback(({ set }) => async () => {});
  return <ProfileView user={user} />;
};
