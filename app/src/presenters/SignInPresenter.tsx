import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { userHydrateState } from '../state/user';
import { loginStatusState } from '../state/authentication';
import { SignInView } from '../views/SignInView';
import { signInWithEmailAndPassword } from '../services/firebase/auth';
import { UserCredentials } from '../types/UserCredentials';
import { userCollection } from '../services/firebase/storage';
import { snackbarState } from '../state/snackbar';
import { fetchCountryCode } from '../services/ipdata';
import { getGravatarUrl } from '../services/gravatar';

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

      const {
        name,
        phone,
        team,
        avatar,
        countryCode,
      } = await userCollection.get(loginResponse.user.uid);

      // Update old users
      const id = loginResponse.user?.uid;
      const newDetails = {
        avatar: avatar,
        countryCode: countryCode,
      };
      if (!avatar || avatar === 'N/A') {
        newDetails.avatar = getGravatarUrl({
          email: credentials.email as string,
          defaultImage: 'robohash',
        });
        userCollection.update(id, { avatar: newDetails.avatar });
      }
      if (!countryCode) {
        newDetails.countryCode = await fetchCountryCode();
        userCollection.update(id, { countryCode: newDetails.countryCode });
      }

      set(loginStatusState, 'success');
      set(userHydrateState, {
        id: id as string,
        email: loginResponse.user?.email as string,
        name,
        phone,
        team,
        avatar: newDetails.avatar,
        countryCode: newDetails.countryCode,
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
