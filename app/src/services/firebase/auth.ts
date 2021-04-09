import firebase from 'firebase';
import { app } from '.';
import 'firebase/auth';

import { UserCredentials } from '../../types/UserCredentials';


const auth = app.auth();

export const signInWithEmailAndPassword = async (credentials: UserCredentials) =>
  auth.signInWithEmailAndPassword(credentials.email, credentials.password);


export const getCurrentUser = async () => {
  return new Promise<firebase.User>((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
        unsubscribe();
      }
    });
  });
};

export const signUp = async (credentials: UserCredentials) => {
  try {
    const userCredentials = await auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    if (userCredentials.user) {
      const user = {
        id: userCredentials.user.uid,
        isAuthenticated: true,
        email: credentials.email,
      };
      return user;
    }
  } catch (e) {
    throw e;
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (e) {
    throw e;
  }
};
