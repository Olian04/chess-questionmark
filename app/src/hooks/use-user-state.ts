import { useAuthState } from './use-auth-state';

export const useUserState = () => useAuthState()[0];
