import React from 'react';
import { Redirect, Route as BaseRoute, RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getAuth } from '../../../state/user';

interface Props extends RouteProps {
  needAuth?: boolean;
}
export const RecoilRoute = (props: Props) => {
  const { children, needAuth, ...baseProps } = props;
  const isAuthenticated = useRecoilValue(getAuth);
  if (needAuth && !isAuthenticated) {
    return (
      <BaseRoute>
        <Redirect to="/login" />
      </BaseRoute>
    );
  }
  return <BaseRoute {...baseProps}>{children}</BaseRoute>;
};
