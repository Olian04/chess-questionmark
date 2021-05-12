import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { createUserWithEmailAndPassword } from '../services/firebase/auth';
import {
  profileCollection,
  userCollection,
} from '../services/firebase/storage';
import { fetchCountryCode } from '../services/ipdata';
import { loginStatusState } from '../state/authentication';
import { snackbarState } from '../state/snackbar';
import {
  defaultProfileState,
  profileState,
  userHydrateState,
} from '../state/user';
import { User } from '../types/User';
import { getGravatarUrl } from '../services/gravatar';
import { UserCredentials } from '../types/UserCredentials';
import { UserExtras } from '../types/UserExtras';
import { SignUpView } from '../views/SignUpView';
import { modalState } from '../state/modal';

const nonApplicable = 'N/A';

export const SignUpPresenter = () => {
  const loginStatus = useRecoilValue(loginStatusState);
  const history = useHistory();
  const setModal = useSetRecoilState(modalState);
  const [checked, setChecked] = useState(false);
  const signUp = useRecoilCallback(
    ({ set }) => async (
      credentials: UserCredentials,
      extras: Partial<UserExtras>
    ) => {
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

      const signUpResponse = await createUserWithEmailAndPassword(
        credentials
      ).catch((e) => {
        set(snackbarState, {
          open: true,
          severity: 'error',
          message: e.message,
        });
        set(loginStatusState, 'fail');
        return;
      });

      if (!signUpResponse || signUpResponse.user === null) {
        set(loginStatusState, 'fail');
        return;
      }

      const countryCode = await fetchCountryCode();

      const user = {
        id: signUpResponse.user.uid as string,
        email: signUpResponse.user.email as string,
        name: extras.name as string,
        phone: nonApplicable,
        avatar: getGravatarUrl({
          email: signUpResponse.user.email as string,
          defaultImage: 'robohash',
        }),
        team: nonApplicable,
        countryCode: countryCode,
      };

      await profileCollection.set(signUpResponse.user.uid, defaultProfileState);
      // Creates a user-document and stores in on firestore
      await userCollection.set(signUpResponse.user.uid, {
        countryCode: user.countryCode,
        name: extras.name ? extras.name : user.name,
        team: extras.team ? extras.team : user.team,
        phone: extras.phone ? extras.phone : user.phone,
        avatar: extras.avatar ? extras.avatar : user.avatar,
      });

      set(loginStatusState, 'success');
      set(userHydrateState, user);
      set(profileState, defaultProfileState);
      history.push('/play');
    }
  );
  const handleModal = (type: string) => {
    if (type === 'terms') {
      setModal({
        open: true,
        title: 'Terms of service',
        content: [
          'Upon signup to "chess?", you hereby agree to give the creators of "chess?" an automatic A if your firstname starts on either of: M, C, A, E, W, P, S, H.',
          'These terms are valid throughout year 2021.',
        ],
      });
    }
    if (type === 'policy') {
      setModal({
        open: true,
        title: 'Privacy policy',
        content: [
          "If you are concerned of your identity, don't use a valid email.",
          "We don't verify it anyways. Lol",
        ],
      });
    }
  };
  return (
    <SignUpView
      onLoading={loginStatus === 'pending'}
      onSignUpAttempt={signUp}
      onHandleModal = {handleModal}
      onSetChecked = {setChecked}
      checked = {checked}
    />
  );
};
