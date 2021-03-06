import React from 'react';
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Formik } from 'formik';

import { SigninSchema } from '../util/signinSchema';
import { RoundedTextField } from '../components/common/RoundedTextField';
import { LinkButton } from '../components/common/LinkButton';
import { StyledLink } from '../components/common/CustomLink';
import { UserCredentials } from '../types/UserCredentials';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    gridBase: {
      zIndex: 1,
      position: 'relative',
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(-0.5),
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

interface Props {
  onLoginAttempt: (credentials: UserCredentials) => void;
  loginStatus: 'pending' | 'idle' | 'success' | 'fail';
}

export const SignInView = (props: Props) => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.container}>
        <Grid
          container
          direction="column"
          justify="center"
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
                        onBlur={formProps.handleBlur}
                        error={formProps.errors.email && formProps.touched.email ? true : false}
                        helperText={
                          formProps.errors.email && formProps.touched.email ? formProps.errors.email : ''
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
                        onBlur={formProps.handleBlur}
                        error={formProps.errors.password && formProps.touched.password ? true : false}
                        helperText={
                          formProps.errors.password && formProps.touched.password
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
