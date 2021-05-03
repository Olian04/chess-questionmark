import React, { ReactComponentElement, ReactNode } from 'react';
import { Redirect, Route as BaseRoute, RouteProps } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useAuthState } from '../hooks/use-auth-state';
import { userHydrateState } from '../state/user';
import { LoadingView } from '../views/LoadingView';

interface RecoilRouteProps extends RouteProps {
  guarded?: boolean;
}

const nonApplicable = 'N/A';

export const RecoilRoute = (props: RecoilRouteProps) => {
  const { children, guarded, component, ...baseProps } = props;

  const [user, loading, error] = useAuthState();
  const setUserState = useSetRecoilState(userHydrateState);

  const ShowRoute = (children: ReactNode) => (
    <BaseRoute {...baseProps}>{children}</BaseRoute>
  );

  const ShowRouteComponent = (component: React.ComponentType<any>) => (
    <BaseRoute component={component} {...baseProps} />
  );
  /** If firebase auth returns error, we always redirect to the landing page */
  if (error) return ShowRoute(<Redirect to="/login" />);
  /** If there exists a user and they visits the login route,
   *  we redirect them back to profile */
  if (guarded && user) {
    if (component) return ShowRouteComponent(component);
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

  if (user && baseProps.path?.includes('login'))
    return ShowRoute(<Redirect to="/play" />);
  /** If a route is guarded and firebase auth returns a user,
   * we persist the user and shows the requested route
   */

  if (component) return ShowRouteComponent(component);
  return ShowRoute(children);
};
