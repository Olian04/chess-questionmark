import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { useChangePassword } from '../hooks/use-change-password';
import { useChangeEmail } from '../hooks/use-change-email';
import { signOut } from '../services/firebase/auth';
import { userCollection } from '../services/firebase/storage';
import { loginStatusState } from '../state/authentication';
import { userState, userExtraData, currentUserIDState } from '../state/user';
import { AccountView } from '../views/AccountView ';
import { SignupSchema } from '../util/signupSchema';
import { ValidationError } from 'yup';
import { UserCredentials } from '../types/UserCredentials';
import { snackbarState } from '../state/snackbar';
import { capitalize } from '../util/stringManipulation';
import { UserExtras } from '../types/UserExtras';
import { FieldValues } from '../components/settings/UpdateFieldModal';

export const AccountPresenter = () => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const history = useHistory();
  const user = useRecoilValue(userState);

  const changePassword = useChangePassword();
  const changeEmail = useChangeEmail();

  const updateUser = useRecoilCallback(
    ({ set, snapshot }) =>
      async (partialUser: Partial<UserExtras>) => {
        const userID = await snapshot.getPromise(currentUserIDState);
        if (userID === null) {
          setSnackbar({
            open: true,
            message: `An error occurred when updating`,
            severity: 'error',
            bottom: 25,
          });
          return;
        }

        const curr = await snapshot.getPromise(userExtraData({ id: userID }));
        if (curr === null) {
          setSnackbar({
            open: true,
            message: `An error occurred when updating`,
            severity: 'error',
            bottom: 25,
          });
          return;
        }

        try {
          set(userExtraData({ id: user.id }), {
            ...curr,
            ...partialUser,
          });
          await userCollection.update(user.id, partialUser);
          setSnackbar({
            open: true,
            message: `Successfully updated`,
            severity: 'success',
            bottom: 25,
          });
        } catch (err) {
          setSnackbar({
            open: true,
            message: `An error occurred when updating`,
            severity: 'error',
            bottom: 25,
          });
        }
      }
  );

  const updateEmail = async (email: string, password: string) => {
    const isSuccess = await changeEmail(email, password);
    if (isSuccess) {
      setSnackbar({
        open: true,
        message: 'Email updated',
        severity: 'success',
        bottom: 25,
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Failed to update email',
        severity: 'error',
        bottom: 25,
      });
    }
  };

  const updatePassword = async (cred: UserCredentials, newPassword: string) => {
    const isSuccess = await changePassword(cred, newPassword);
    if (isSuccess) {
      setSnackbar({
        open: true,
        message: 'Password updated',
        severity: 'success',
        bottom: 25,
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Failed to update password',
        severity: 'error',
        bottom: 25,
      });
    }
  };

  const logoutUser = useRecoilCallback(({ set, reset }) => async () => {
    await signOut();
    set(loginStatusState, 'idle');
    reset(currentUserIDState);

    history.push('/');
  });

  const handleOnChange = (values: Partial<FieldValues>) => {
    if (values.password && values.newPassword && values.email) {
      updatePassword(
        {
          password: values.password,
          email: values.email,
        },
        values.newPassword
      );
    } else if (values.password && values.email) {
      updateEmail(values.email, values.password);
    } else {
      updateUser(values);
    }
  };

  const validatePassword = (newPassword: string) => {
    try {
      SignupSchema.validateSync({
        email: 'hgfdsa@hgfds.hgfds',
        name: 'kjhgfdsa',
        password: newPassword,
      });
      return null;
    } catch (err) {
      const e = err as ValidationError;
      return e.errors[0];
    }
  };

  return (
    <AccountView
      user={user}
      onClickLogout={logoutUser}
      onChange={handleOnChange}
      validateNewPassword={validatePassword}
    />
  );
};
