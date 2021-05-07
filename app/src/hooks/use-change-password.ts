import { useRecoilCallback } from 'recoil';
import firebase from 'firebase';

import { SignupSchema } from '../util/signupSchema';
import { loginCredentialsState } from '../state/authentication';
import { useUserState } from './use-user-state';
import { UserCredentials } from '../types/UserCredentials';

export const useChangePassword = () => {
  const firebaseUser = useUserState();
  const updatePassword = useRecoilCallback(
    ({ set }) => async (cred: UserCredentials, newPassword: string) => {
      try {
        const emailCredentials = firebase.auth.EmailAuthProvider.credential(
          cred.email,
          cred.password
        );
        await firebaseUser?.reauthenticateWithCredential(emailCredentials);
        await firebaseUser?.updatePassword(newPassword);
        set(loginCredentialsState, {
          email: cred.email,
          password: newPassword,
        });
        return true;
      } catch {
        return false;
      }
    }
  );
  return updatePassword;
};
