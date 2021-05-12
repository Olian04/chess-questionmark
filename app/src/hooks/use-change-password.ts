import { useRecoilCallback } from 'recoil';
import firebase from 'firebase';

import { loginCredentialsState } from '../state/authentication';
import { useFirebaseUser } from './use-firebase-user';
import { UserCredentials } from '../types/UserCredentials';

export const useChangePassword = () => {
  const firebaseUser = useFirebaseUser();
  const updatePassword = useRecoilCallback(
    ({ set }) =>
      async (cred: UserCredentials, newPassword: string) => {
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
