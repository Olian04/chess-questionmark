import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { LoadingAnimation } from '../components/common/LoadingAnimation';
import { userData, userCredentials } from '../state/user';
import { SignInView } from '../views/SignInView';

export const SignInPresenter = () => {
  const setUserCredentials = useSetRecoilState(userCredentials);
  const loadableUser = useRecoilValueLoadable(userData);
  const [loginAttempt, setLoginAttempt] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (loadableUser.state !== 'hasValue') return;
    if (!loginAttempt) return;
    if (!loadableUser.contents.isAuthenticated) return;
    history.push('/settings');
  }, [loadableUser.state]);

  switch (loadableUser.state) {
    case 'loading':
      return <LoadingAnimation />;
    case 'hasValue':
      return (
        <SignInView
          onLoginAttempt={(credentials) => {
            setLoginAttempt(true);
            setUserCredentials(credentials);
          }}
        />
      );
    case 'hasError':
      // TODO: Add error handling
      return null;
  }
};
