import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { signOut } from '../services/firebase/auth';
import { userCollection } from '../services/firebase/storage';
import { loginStatusState } from '../state/authentication';
import {
  defaultProfileState,
  defaultUserState,
  profileState,
  userHydrateState,
  userState,
} from '../state/user';
import { SettingsView } from '../views/SettingsView ';

export const SettingsProvider = () => {
  const user = useRecoilValue(userHydrateState);
  const history = useHistory();

  const logoutUser = useRecoilCallback(({ set }) => async () => {
    await signOut();
    set(loginStatusState, 'idle');
    set(userState, defaultUserState);
    set(profileState, defaultProfileState);
    history.push('/');
  });

  return <SettingsView user={user} onLogoutAttempt={logoutUser} />;
};
