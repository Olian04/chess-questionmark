import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil';

import { useChangePassword } from '../hooks/use-change-password';
import { useUserState } from '../hooks/use-user-state';
import { signOut } from '../services/firebase/auth';
import { userCollection } from '../services/firebase/storage';
import { loginStatusState } from '../state/authentication';
import {
  defaultProfileState,
  defaultUserState,
  profileState,
  userHydrateState,
} from '../state/user';
import { AccountView } from '../views/AccountView ';
import { SignupSchema } from '../util/signupSchema';
import { ValidationError } from 'yup';
import { UserCredentials } from '../types/UserCredentials';
import { snackbarState } from '../state/snackbar';
import { capitalize } from '../util/stringManimpulation';

export const AccountPresenter = () => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const history = useHistory();
  const firebaseUser = useUserState();
  const changePassword = useChangePassword();
  const [user, setUserState] = useRecoilState(userHydrateState);

  const updateUser = async (key: string, value: string) => {
    try {
      setUserState({
        ...user,
        [key]: value,
      });
      await userCollection.update(user.id, {
        [key]: value,
      });
      setSnackbar({
        open: true,
        message: `${capitalize(key)} updated`,
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: `An error occurred when updating ${key}`,
        severity: 'error',
      });
    }
  };

  const updateEmail = (value: string) => {
    firebaseUser?.updateEmail(value).catch((e: Error) => console.log(e));
    setUserState({ ...user, email: value });
  };

  const updatePassword = (cred: UserCredentials, newPassword: string) => {
    const isSuccess = changePassword(cred, newPassword);
    if (isSuccess) {
      setSnackbar({
        open: true,
        message: 'Password updated',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Failed to update password',
        severity: 'error',
      });
    }
  };

  const updateAvatar = (value: string) => updateUser('avatar', value);
  const updateName = (value: string) => updateUser('name', value);
  const updatePhone = (value: string) => updateUser('phone', value);
  const updateTeam = (value: string) => updateUser('team', value);

  const logoutUser = useRecoilCallback(({ set }) => async () => {
    await signOut();
    set(loginStatusState, 'idle');
    set(userHydrateState, defaultUserState);
    set(profileState, defaultProfileState);
    history.push('/');
  });

  const validatePassword = (newPassword: string) => {
    try {
      SignupSchema.validateSync({
        email: 'hgfdsa@hgfds.hgfds',
        name: 'kjhgfdsa',
        password: newPassword,
      });
      return null;
    } catch (err) {
      const e = err as ValidationError;
      return e.errors[0];
    }
  };

  return (
    <AccountView
      user={user}
      onClickLogout={logoutUser}
      onChangeEmail={updateEmail}
      onChangePassword={updatePassword}
      onChangeAvatar={updateAvatar}
      onChangeName={updateName}
      onChangePhone={updatePhone}
      onChangeTeam={updateTeam}
      validateNewPassword={validatePassword}
    />
  );
};
