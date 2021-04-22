import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { createUserWithEmailAndPassword } from '../services/firebase/auth';
import {
  profileCollection,
  userCollection,
} from '../services/firebase/storage';
import { loginStatusState } from '../state/authentication';
import { snackbarState } from '../state/snackbar';
import { defaultProfileState, profileState, userState } from '../state/user';
import { User } from '../types/User';
import { UserCredentials } from '../types/UserCredentials';
import { UserExtras } from '../types/UserExtras';
import { SignUpView } from '../views/SignUpView';

const nonApplicable = 'N/A';

export const SignUpPresenter = () => {
  const loginStatus = useRecoilValue(loginStatusState);
  const history = useHistory();
  const signUp = useRecoilCallback(
    ({ set, snapshot }) => async (
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

      const user = {
        id: signUpResponse.user.uid as string,
        email: signUpResponse.user.email as string,
        name: extras.name as string,
        team: extras.team ? extras.team : nonApplicable,
        phone: extras.phone ? extras.phone : nonApplicable,
        avatar: extras.avatar ? extras.avatar : nonApplicable,
      };

      await profileCollection.set(signUpResponse.user.uid, defaultProfileState);
      // Creates a user-document and stores in on firestore
      await userCollection.set(signUpResponse.user.uid, {
        name: extras.name ? extras.name : nonApplicable,
        team: extras.team ? extras.team : nonApplicable,
        phone: extras.phone ? extras.phone : nonApplicable,
        avatar: extras.avatar ? extras.avatar : nonApplicable,
      });

      set(loginStatusState, 'success');
      set(userState, user);
      set(profileState, defaultProfileState);
      history.push('/profile');
    }
  );
  return (
    <>
      <SignUpView
        onLoading={loginStatus === 'pending'}
        onSignUpAttempt={signUp}
      />
    </>
  );
};
