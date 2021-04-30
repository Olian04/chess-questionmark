import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RoundedTextField } from '../components/common/RoundedTextField';
import { LinkButton } from '../components/common/LinkButton';
import { StyledLink } from '../components/common/CustomLink';
import { UserCredentials } from '../types/UserCredentials';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { green } from '@material-ui/core/colors';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginStatusState } from '../state/authentication';
import { Snackbar } from '../components/common/Snackbar';
import { snackbarState } from '../state/snackbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
    },
    gridBase: {
      zIndex: 1,
      position: 'relative',
    },
    wrapper: {
      position: 'relative',
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

const SigninSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface Props {
  onLoginAttempt: (credentials: UserCredentials) => void;
  loginStatus: 'pending' | 'idle' | 'success' | 'fail';
}

export const SignInView = (props: Props) => {
  const classes = useStyles();

  return (
    <>
      <Snackbar />
      <Container className={classes.container}>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={1}
          alignItems="center"
          className={classes.gridBase}
        >
          <Grid
            item
            style={{
              marginBottom: '2em',
              width: '100%',
            }}
          >
            <Typography variant="h4" align="center">
              Sign in
            </Typography>
          </Grid>
          <Grid item>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={async (values, actions) => {
                await props.onLoginAttempt({
                  email: values.email,
                  password: values.password,
                });
              }}
              validationSchema={SigninSchema}
            >
              {(formProps) => (
                <form onSubmit={formProps.handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <RoundedTextField
                        color="secondary"
                        autoComplete="email"
                        name="email"
                        variant="filled"
                        fullWidth
                        id="email"
                        label="Email"
                        autoFocus
                        onChange={formProps.handleChange}
                        error={formProps.errors.email ? true : false}
                        helperText={
                          formProps.errors.email ? formProps.errors.email : ''
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RoundedTextField
                        color="secondary"
                        variant="filled"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formProps.handleChange}
                        error={formProps.errors.password ? true : false}
                        helperText={
                          formProps.errors.password
                            ? formProps.errors.password
                            : ''
                        }
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{ marginTop: '2em' }}
                      className={classes.wrapper}
                    >
                      <LinkButton
                        type="submit"
                        color="secondary"
                        padding="1em"
                        disabled={props.loginStatus in ['success', 'pending']}
                        fullWidth
                      >
                        Take me to battle
                      </LinkButton>
                      {props.loginStatus === 'pending' && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        Don't have an account with us yet?{' '}
                        <StyledLink to="/login/sign-up">Sign up</StyledLink>
                      </Typography>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
