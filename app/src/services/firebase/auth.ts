import { app } from '.';
import 'firebase/auth';

import { User } from '../../types/User';
import { UserCredentials } from '../../types/UserCredentials';
import { userCredentials } from '../../state/user';

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
  } catch {
    return {
      id: fallbackString,
      name: fallbackString,
      isAuthenticated: false,
      email: credentials.email,
    };
  }
};

export const signUp = async (credentials: UserCredentials): Promise<User> => {
  try {
    const userCredentials = await auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    if (userCredentials.user) {
      return {
        id: userCredentials.user.uid,
        name: userCredentials.user.displayName,
        isAuthenticated: true,
        email: userCredentials.user.email,
      };
    }
    throw new Error('No user can be found');
  } catch {
    return {
      id: fallbackString,
      name: fallbackString,
      isAuthenticated: false,
      email: credentials.email,
    };
  }
};
