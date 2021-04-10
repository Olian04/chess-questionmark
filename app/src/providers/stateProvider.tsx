import React, { ReactNode } from 'react';
import { Redirect, Route as BaseRoute, RouteProps } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useAuthState } from '../services/firebase/auth';
import { userState } from '../state/user';
import { LoadingView } from '../views/LoadingView';

interface RecoilRouteProps extends RouteProps {
  guarded?: boolean;
}

export const RecoilRoute = (props: RecoilRouteProps) => {
  const { children, guarded, ...baseProps } = props;

  const [user, loading, error] = useAuthState();
  const setUserState = useSetRecoilState(userState);

  const ShowRoute = (children: ReactNode) => (
    <BaseRoute {...baseProps}>{children}</BaseRoute>
  );
  /** If firebase auth returns error, we always redirect to the landing page */
  if (error) return ShowRoute(<Redirect to="/login" />);
  /** If a route is guarded and firebase auth returns a user,
   * we persist the user and shows the requested route
   */
  if (guarded && user) {
    setUserState({
      id: user.uid,
      name: user.displayName as string,
      email: user.email as string,
    });
    return ShowRoute(children);
  }
  /** If a route is guarded and firebase auth is fetching a user
   * we show a loader until a user has been fetched
   */
  if (guarded && loading) return <LoadingView message="Fetching state" />;
  /** If a route is guarded but no user or if a error is returned by firebase auth,
   * we redirect them to the landing page.
   */
  if (guarded && (!user || error)) return ShowRoute(<Redirect to="/login" />);
  /* When a route is not guarded, we show the requested route */
  return ShowRoute(children);
};
