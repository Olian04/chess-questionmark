import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilState } from 'recoil';
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

export const AccountPresenter = () => {
  const history = useHistory();
  const firebaseUser = useUserState();
  const [user, setUserState] = useRecoilState(userHydrateState);

  const updateUser = (key: string, value: string) => {
    userCollection.update(user.id, {
      [key]: value,
    });
    setUserState({
      ...user,
      [key]: value,
    });
  };

  const updateEmail = (value: string) => {
    firebaseUser?.updateEmail(value).catch((e: Error) => console.log(e));
    setUserState({ ...user, email: value });
  };

  const updatePassword = (value: string) => {
    firebaseUser?.updatePassword(value).catch((e: Error) => console.log(e));
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
    />
  );
};
