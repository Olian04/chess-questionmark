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
  userState,
} from '../state/user';
import { AccountView } from '../views/AccountView ';

export const AccountPresenter = () => {
  const history = useHistory();
  const firebaseUser = useUserState();
  const [user, setUserState] = useRecoilState(userState);

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

  const logoutUser = useRecoilCallback(({ set }) => async () => {
    await signOut();
    set(loginStatusState, 'idle');
    set(userState, defaultUserState);
    set(profileState, defaultProfileState);
    history.push('/');
  });

  return (
    <AccountView
      user={user}
      onClickLogout={logoutUser}
      onChangeEmail={updateEmail}
      onChangeAvatar={(value) => updateUser('avatar', value)}
      onChangeName={(value) => updateUser('name', value)}
      onChangePhone={(value) => updateUser('phone', value)}
      onChangeTeam={(value) => updateUser('team', value)}
      onChangePassword={() => {
        throw new Error('Not yet implemented');
      }}
    />
  );
};
