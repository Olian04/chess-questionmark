import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { useFirebaseUser } from '../hooks/use-firebase-user';
import { signOut } from '../services/firebase/auth';
import { userCollection } from '../services/firebase/storage';
import { loginStatusState } from '../state/authentication';
import {
  profileState,
  userState,
  userExtraData,
  userFirebaseState,
  currentUserIDState,
  profileData,
} from '../state/user';
import { AccountView } from '../views/AccountView ';

export const AccountPresenter = () => {
  const history = useHistory();
  const firebaseUser = useFirebaseUser();
  const user = useRecoilValue(userState);
  const setUserExtraData = useSetRecoilState(userExtraData(user.id));
  const setUserFirebaseState = useSetRecoilState(userFirebaseState);

  const updateUser = (key: string, value: string) => {
    userCollection.update(user.id, {
      [key]: value,
    });
    setUserExtraData({
      ...user,
      [key]: value,
    });
  };

  const updateEmail = (value: string) => {
    firebaseUser?.updateEmail(value).catch((e: Error) => console.log(e));
    setUserFirebaseState({ email: value });
  };

  const updatePassword = (value: string) => {
    firebaseUser?.updatePassword(value).catch((e: Error) => console.log(e));
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
