import { useAuthState as baseState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase/auth';

export const useAuthState = () => {
  return baseState(auth);
};
