import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { LoadingAnimation } from '../components/common/LoadingAnimation';
import { userData } from '../state/user';
import { ProfileView } from '../views/ProfileView';

export const ProfileProvider = () => {
  const user = useRecoilValue(userData);

  return <ProfileView user={user} />;
};