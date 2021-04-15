import firebase from 'firebase';
import { app } from '.';
import 'firebase/auth';

import { UserCredentials } from '../../types/UserCredentials';

const TWO_SECONDS_IN_MS = 2000;

export const auth = app.auth();

export const signInWithEmailAndPassword = async (
  credentials: UserCredentials
) => auth.signInWithEmailAndPassword(credentials.email, credentials.password);

export const createUserWithEmailAndPassword = async (
  credentials: UserCredentials
) =>
  await auth.createUserWithEmailAndPassword(
    credentials.email,
    credentials.password
  );

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (e) {
    throw e;
  }
};

export const getCurrentUser = async (): Promise<firebase.User | null> => {
  if (auth.currentUser !== null) return auth.currentUser;
  return new Promise((resolve) => {
    const timeoutID = setTimeout(() => resolve(null), TWO_SECONDS_IN_MS);
    const listner = () => (maybeUser: firebase.User | null) => {
      if (maybeUser === null) return;
      clearTimeout(timeoutID);
      removeListner();
      resolve(auth.currentUser);
    };
    const removeListner = auth.onAuthStateChanged(listner);
  });
};
