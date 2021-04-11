import firebase from 'firebase';
import { useAuthState as baseState } from 'react-firebase-hooks/auth';
import { app } from '.';
import 'firebase/auth';

import { UserCredentials } from '../../types/UserCredentials';

const auth = app.auth();

export const signInWithEmailAndPassword = async (
  credentials: UserCredentials
) => auth.signInWithEmailAndPassword(credentials.email, credentials.password);

export const useAuthState = () => {
  return baseState(auth);
};

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
