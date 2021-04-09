import React, { useState } from 'react';
import {
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Typography,
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RoundedTextField } from '../components/common/RoundedTextField';
import { LinkButton } from '../components/common/LinkButton';
import { StyledLink } from '../components/common/CustomLink';
import { UserCredentials } from '../types/UserCredentials';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { green } from '@material-ui/core/colors';
import { loginUser } from '../services/firebase/auth';
import { useSetRecoilState } from 'recoil';
import { userState } from '../state/user';
import { useHistory } from 'react-router-dom';

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
}

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
export const SignInView = (props: Props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'information',
    duration: 6000,
    message: '',
  });

  const setCredentials = useSetRecoilState(userState);

  const handleOnClose = (event: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  const history = useHistory();

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.duration}
        onClose={handleOnClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleOnClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
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
                if (!loading) {
                  try {
                    setLoading(true);
                    const user = await loginUser({
                      email: values.email,
                      password: values.password,
                    });
                    setCredentials(user);
                    history.push('/profile');
                  } catch ({ code, message }) {
                    switch (code) {
                      case 'auth/user-not-found':
                        setSnackbar({
                          ...snackbar,
                          message: 'No user found with the provided email',
                          severity: 'error',
                          open: true,
                        });
                    }
                  }
                  setLoading(false);
                }
              }}
              validationSchema={SigninSchema}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
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
                        onChange={props.handleChange}
                        error={props.errors.email ? true : false}
                        helperText={
                          props.errors.email ? props.errors.email : ''
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
                        onChange={props.handleChange}
                        error={props.errors.password ? true : false}
                        helperText={
                          props.errors.password ? props.errors.password : ''
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
                        disabled={loading}
                        fullWidth
                      >
                        Take me to battle
                      </LinkButton>
                      {loading && (
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
