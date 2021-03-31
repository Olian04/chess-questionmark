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
  } catch {
    return {
      id: fallbackString,
      name: fallbackString,
      isAuthenticated: false,
      email: credentials.email,
    };
  }
};
