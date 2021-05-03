import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { userState } from '../state/user';
import { loginStatusState } from '../state/authentication';
import { SignInView } from '../views/SignInView';
import { signInWithEmailAndPassword } from '../services/firebase/auth';
import { UserCredentials } from '../types/UserCredentials';
import { userCollection } from '../services/firebase/storage';
import { snackbarState } from '../state/snackbar';

export const SignInPresenter = () => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const loginStatus = useRecoilValue(loginStatusState);
  const history = useHistory();

  useEffect(() => {
    if (loginStatus === 'fail') {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Login failed',
      });
    }
  }, [loginStatus]);

  const loginUser = useRecoilCallback(
    ({ set }) => async (credentials: UserCredentials) => {
      if (loginStatus in ['pending', 'success']) return;

      set(loginStatusState, 'pending');

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

      const { name, phone } = await userCollection.get(loginResponse.user.uid);

      set(loginStatusState, 'success');
      set(userState, {
        id: loginResponse.user?.uid as string,
        email: loginResponse.user?.email as string,
        name: name as string,
        phone: phone as string,
        team: '',
        avatar: '',
      });
    }
  );

  useEffect(() => {
    if (loginStatus === 'success') {
      history.push('/play');
    }
  }, [loginStatus]);

  return <SignInView loginStatus={loginStatus} onLoginAttempt={loginUser} />;
};
