import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { useChangePassword } from '../hooks/use-change-password';
import { useChangeEmail } from '../hooks/use-change-email';
import { signOut } from '../services/firebase/auth';
import { userCollection } from '../services/firebase/storage';
import { loginStatusState } from '../state/authentication';
import { userState, userExtraData, currentUserIDState } from '../state/user';
import { AccountView } from '../views/AccountView ';
import { SignupSchema } from '../util/signupSchema';
import { ValidationError } from 'yup';
import { UserCredentials } from '../types/UserCredentials';
import { snackbarState } from '../state/snackbar';
import { capitalize } from '../util/stringManipulation';

export const AccountPresenter = () => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const history = useHistory();
  const user = useRecoilValue(userState);
  const setUserExtraData = useSetRecoilState(userExtraData({ id: user.id }));

  const changePassword = useChangePassword();
  const changeEmail = useChangeEmail();

  const updateUser = async (key: string, value: string) => {
    try {
      setUserExtraData({
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
        bottom: 25,
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: `An error occurred when updating ${key}`,
        severity: 'error',
        bottom: 25,
      });
    }
  };

  const updateEmail = async (email: string, password: string) => {
    const isSuccess = await changeEmail(email, password);
    if (isSuccess) {
      setSnackbar({
        open: true,
        message: 'Email updated',
        severity: 'success',
        bottom: 25,
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Failed to update email',
        severity: 'error',
        bottom: 25,
      });
    }
  };

  const updatePassword = async (cred: UserCredentials, newPassword: string) => {
    const isSuccess = await changePassword(cred, newPassword);
    if (isSuccess) {
      setSnackbar({
        open: true,
        message: 'Password updated',
        severity: 'success',
        bottom: 25,
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Failed to update password',
        severity: 'error',
        bottom: 25,
      });
    }
  };

  const updateAvatar = (value: string) => updateUser('avatar', value);
  const updateName = (value: string) => updateUser('name', value);
  const updatePhone = (value: string) => updateUser('phone', value);
  const updateTeam = (value: string) => updateUser('team', value);

  const logoutUser = useRecoilCallback(({ set, reset }) => async () => {
    await signOut();
    set(loginStatusState, 'idle');
    reset(currentUserIDState);

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
