import { app } from '.';
import 'firebase/auth';

import { UserCredentials } from '../../types/UserCredentials';

const auth = app.auth();

export const signInWithEmailAndPassword = async (credentials: UserCredentials) =>
  auth.signInWithEmailAndPassword(credentials.email, credentials.password);
