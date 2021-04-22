import React, { ReactComponentElement, ReactNode } from 'react';
import { Redirect, Route as BaseRoute, RouteProps } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useAuthState } from '../hooks/use-auth-state';
import { userCollection } from '../services/firebase/storage';
import { userState } from '../state/user';
import { LoadingView } from '../views/LoadingView';

interface RecoilRouteProps extends RouteProps {
  guarded?: boolean;
}

const nonApplicable = 'N/A';

export const RecoilRoute = (props: RecoilRouteProps) => {
  const { children, guarded, component, ...baseProps } = props;

  const [user, loading, error] = useAuthState();
  const setUserState = useSetRecoilState(userState);

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
    /*
    userCollection.get(user.uid).then((extras) =>
      setUserState({
        id: user.uid,
        name: extras.name as string,
        email: user.email as string,
        phone: extras?.phone ?? (nonApplicable as string),
        team: extras?.team ?? (nonApplicable as string),
        avatar: extras?.avatar ?? (nonApplicable as string),
      })
    );
    */
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
    return ShowRoute(<Redirect to="/profile" />);
  /** If a route is guarded and firebase auth returns a user,
   * we persist the user and shows the requested route
   */

  if (component) return ShowRouteComponent(component);
  return ShowRoute(children);
};
