import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { userState } from '../state/user';
import {
  loginStatusState,
  loginCredentialsState,
} from '../state/authentication';
import { SignInView } from '../views/SignInView';
import { signInWithEmailAndPassword } from '../services/firebase/auth';

export const SignInPresenter = () => {
  const setLoginCredentials = useSetRecoilState(loginCredentialsState);
  const loginStatus = useRecoilValue(loginStatusState);
  const history = useHistory();

  const loginUser = useRecoilCallback(({ snapshot, set }) => async () => {
    set(loginStatusState, 'pending');

    const credentials = await snapshot.getPromise(loginCredentialsState);
    if (
      credentials === null ||
      credentials.email.trim() === '' ||
      credentials.password.trim() === ''
    ) {
      set(loginStatusState, 'fail');
      return;
    }

    const loginResponse = await signInWithEmailAndPassword(credentials).catch(
      () => {
        set(loginStatusState, 'fail');
      }
    );
    if (!loginResponse || loginResponse.user === null) {
      set(loginStatusState, 'fail');
      return;
    }
    set(loginStatusState, 'success');
    set(userState, {
      id: loginResponse.user?.uid as string,
      email: loginResponse.user?.email as string,
      name: loginResponse.user?.displayName as string,
    });
  });

  useEffect(() => {
    if (loginStatus === 'success') {
      history.push('/settings');
    }
  }, [loginStatus]);

  return (
    <>
      <SignInView
        loginFailed={loginStatus === 'fail'}
        onLoginAttempt={(credentials) => {
          setLoginCredentials(credentials);
          loginUser();
        }}
      />
    </>
  );
};
