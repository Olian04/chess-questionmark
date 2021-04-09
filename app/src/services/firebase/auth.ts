import firebase from 'firebase';
import { app } from '.';
import 'firebase/auth';

import { User } from '../../types/User';
import { UserCredentials } from '../../types/UserCredentials';

const auth = app.auth();

const fallbackString = 'N/A';

export const loginUser = async (
  credentials: UserCredentials
): Promise<User> => {
  try {
    const firebaseCredentials = await auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    return {
      id: firebaseCredentials.user?.uid ?? fallbackString,
      name: firebaseCredentials.user?.displayName ?? fallbackString,
      isAuthenticated: true,
      email: credentials.email,
    };
  } catch (e) {
    throw e;
  }
};

// need to find the firebase.User type..
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
