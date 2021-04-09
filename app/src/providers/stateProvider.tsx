import React from 'react';
import {
  Redirect,
  Route as BaseRoute,
  RouteProps,
  Switch as BaseSwitch,
  SwitchProps,
} from 'react-router-dom';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { getCurrentUser } from '../services/firebase/auth';
import { getAuth, userState } from '../state/user';

interface RecoilRouteProps extends RouteProps {
  needAuth?: boolean;
}

interface RecoilSwitchProps extends SwitchProps {}

export const RecoilRoute = (props: RecoilRouteProps) => {
  const { children, needAuth, ...baseProps } = props;

  const isAuthenticated = useRecoilValue(getAuth);
  console.log(baseProps.path, isAuthenticated);
  if (needAuth && !isAuthenticated) {
    return (
      <BaseRoute>
        <Redirect to="/login" />
      </BaseRoute>
    );
  }
  return <BaseRoute {...baseProps}>{children}</BaseRoute>;
};

export const RecoilSwitch = (props: RecoilSwitchProps) => {
  const { children, ...baseProps } = props;
  const setUser = useSetRecoilState(userState);
  getCurrentUser().then((user) => {
    setUser({
      id: user.uid,
      name: user.displayName,
      email: user.email,
      isAuthenticated: true,
    });
  });
  return <BaseSwitch {...baseProps}>{children}</BaseSwitch>;
};
