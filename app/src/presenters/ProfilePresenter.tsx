import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../state/user';
import { ProfileView } from '../views/ProfileView';

export const ProfileProvider = () => {
  const user = useRecoilValue(userState);

  return <ProfileView user={user} />;
};
