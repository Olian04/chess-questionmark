import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { LoadingAnimation } from '../components/common/LoadingAnimation';
import { userData } from '../state/user';
import { SettingsView } from '../views/SettingsView ';

export const SettingsProvider = () => {
  const user = useRecoilValue(userData);

  return <SettingsView user={user} />;
};
