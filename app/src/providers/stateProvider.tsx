import React, { ReactNode } from 'react';
import { Redirect, Route as BaseRoute, RouteProps } from 'react-router-dom';
import { useAuthState } from '../services/firebase/auth';
import { LoadingView } from '../views/LoadingView';

interface RecoilRouteProps extends RouteProps {
  guarded?: boolean;
}

export const RecoilRoute = (props: RecoilRouteProps) => {
  const { children, guarded, ...baseProps } = props;

  const [user, loading, error] = useAuthState();

  const ShowRoute = (children: ReactNode) => (
    <BaseRoute {...baseProps}>{children}</BaseRoute>
  );
  if (error) return ShowRoute(<Redirect to="/login" />);
  if (guarded && user) return ShowRoute(children);
  if (guarded && loading) return <LoadingView message="Fetching state" />;
  if (guarded && (!user || error)) return ShowRoute(<Redirect to="/login" />);
  return ShowRoute(children);
};
