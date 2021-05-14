import { useRecoilCallback } from 'recoil';
import { useFirebaseUser } from './use-firebase-user';
import firebase from 'firebase';
import { loginCredentialsState } from '../state/authentication';
import { userFirebaseState, userState } from '../state/user';

export const useChangeEmail = () => {
  const firebaseUser = useFirebaseUser();
  const updateEmail = useRecoilCallback(
    ({ set }) =>
      async (newEmail: string, password: string) => {
        try {
          const oldEmail = firebaseUser?.email;
          if (!oldEmail) throw new Error('No found firebase user');
          const emailCredentials = firebase.auth.EmailAuthProvider.credential(
            oldEmail,
            password
          );
          await firebaseUser?.reauthenticateWithCredential(emailCredentials);
          await firebaseUser?.updateEmail(newEmail);
          set(loginCredentialsState, { email: newEmail, password: password });
          set(userFirebaseState, { email: newEmail });
          return true;
        } catch {
          return false;
        }
      }
  );
  return updateEmail;
};
