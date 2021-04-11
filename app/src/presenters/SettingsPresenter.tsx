import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { signOut } from '../services/firebase/auth';
import { loginStatusState } from '../state/authentication';
import { userState } from '../state/user';
import { SettingsView } from '../views/SettingsView ';

export const SettingsProvider = () => {
  const user = useRecoilValue(userState);
  const history = useHistory();
  const notApplicable = 'N/A';

  const logoutUser = useRecoilCallback(({ set }) => async () => {
    await signOut();
    set(loginStatusState, 'idle');
    set(userState, {
      id: notApplicable,
      email: notApplicable,
      name: notApplicable,
      team: notApplicable,
      avatar: notApplicable,
      phone: notApplicable,
    });
    history.push('/');
  });
  return <SettingsView user={user} onLogoutAttempt={logoutUser} />;
};
