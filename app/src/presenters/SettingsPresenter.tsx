import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../state/user';
import { SettingsView } from '../views/SettingsView ';

export const SettingsProvider = () => {
  const user = useRecoilValue(userState);

  return <SettingsView user={user} />;
};
