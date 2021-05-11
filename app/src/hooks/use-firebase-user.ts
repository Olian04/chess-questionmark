import { useAuthState } from './use-auth-state';

export const useFirebaseUser = () => useAuthState()[0];
