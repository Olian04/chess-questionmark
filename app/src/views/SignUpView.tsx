import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useSetRecoilState } from 'recoil';

import { SignupSchema } from '../util/signupSchema';
import { RoundedTextField } from '../components/common/RoundedTextField';
import Logo from '/sign-up-logo.svg';
import { LinkButton } from '../components/common/LinkButton';
import { StyledLink } from '../components/common/CustomLink';
import { UserExtras } from '../types/UserExtras';
import { UserCredentials } from '../types/UserCredentials';
import { Snackbar } from '../components/common/Snackbar';
import { CommonModal } from '../components/common/CommonModal';
import { modalState } from '../state/modal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
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
    link: {
      color: theme.palette.secondary.main,
      '&:hover, &:focus': {
        PointerEvent: 'cursor',
      },
    },
  })
);

interface Props {
  onLoading: boolean;
  onSignUpAttempt: (
    credentials: UserCredentials,
    extras: Partial<UserExtras>
  ) => void;
}

export const SignUpView = (props: Props) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);
  const setModal = useSetRecoilState(modalState);

  const handleCheckbox = (
    formik: any,
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setChecked(checked);
    formik.handleChange(event);
  };
  /*
  const setSnackbar = useSetRecoilState(snackbarState);
  useEffect(() => {
    if (props.signUpFailed) {
      setSnackbar({ open: true });
    }
  }, [props.signUpFailed]);
  */

  const handleModal = (type: string) => {
    if (type === 'terms') {
      setModal({
        open: true,
        title: 'Terms of service',
        content: [
          'Upon signup to "chess?", you hereby agree to give the creators of "chess?" an automatic A if your firstname starts on either of: M, C, A, E, W, P, S, H.',
          'These terms are valid throughout year 2021.',
        ],
      });
    }
    if (type === 'policy') {
      setModal({
        open: true,
        title: 'Privacy policy',
        content: [
          "If you are concerned of your identity, don't use a valid email.",
          "We don't verify it anyways. Lol",
        ],
      });
    }
  };

  return (
    <>
      <CommonModal />
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
          <Grid item>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                agreeOnTerms: checked,
              }}
              onSubmit={async (values, actions) => {
                await props.onSignUpAttempt(
                  { email: values.email, password: values.password },
                  { name: values.name }
                );
              }}
              validationSchema={SignupSchema}
            >
              {(formikProps) => (
                <form onSubmit={formikProps.handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Hidden only="xs">
                          <img src={Logo} width="100vw" />
                        </Hidden>

                        <Typography variant="h5" align="center">
                          Create an account
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <RoundedTextField
                        color="secondary"
                        autoComplete="name"
                        name="name"
                        variant="filled"
                        fullWidth
                        id="ingameName"
                        label="In-game Name"
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        error={
                          formikProps.errors.name && formikProps.touched.name
                            ? true
                            : false
                        }
                        helperText={
                          formikProps.errors.name && formikProps.touched.name
                            ? formikProps.errors.name
                            : ''
                        }
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RoundedTextField
                        color="secondary"
                        autoComplete="email"
                        name="email"
                        variant="filled"
                        fullWidth
                        id="email"
                        label="Email"
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        error={
                          formikProps.errors.email && formikProps.touched.email
                            ? true
                            : false
                        }
                        helperText={
                          formikProps.errors.email && formikProps.touched.email
                            ? formikProps.errors.email
                            : ''
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
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        error={
                          formikProps.errors.password &&
                          formikProps.touched.password
                            ? true
                            : false
                        }
                        helperText={
                          formikProps.errors.password &&
                          formikProps.touched.password
                            ? formikProps.errors.password
                            : ''
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormControl
                          error={
                            formikProps.errors.agreeOnTerms &&
                            formikProps.touched.agreeOnTerms
                              ? true
                              : false
                          }
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={(event, checked) =>
                                  handleCheckbox(formikProps, event, checked)
                                }
                                onBlur={formikProps.handleBlur}
                                value={formikProps.values.agreeOnTerms}
                                name="agreeOnTerms"
                              />
                            }
                            label={
                              <Typography>
                                I agree to the{' '}
                                <span
                                  onClick={() => handleModal('terms')}
                                  className={classes.link}
                                >
                                  Terms
                                </span>
                                {' and '}
                                <span
                                  onClick={() => handleModal('policy')}
                                  className={classes.link}
                                >
                                  Privacy Policy
                                </span>
                              </Typography>
                            }
                          />
                        </FormControl>
                        <FormHelperText
                          error={
                            formikProps.errors.agreeOnTerms &&
                            formikProps.touched.agreeOnTerms
                              ? true
                              : false
                          }
                        >
                          {formikProps.errors.agreeOnTerms &&
                          formikProps.touched.agreeOnTerms
                            ? formikProps.errors.agreeOnTerms
                            : ''}
                        </FormHelperText>
                      </FormGroup>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ marginTop: '2em' }}
                      className={classes.wrapper}
                    >
                      <LinkButton
                        type="submit"
                        fullWidth
                        color="secondary"
                        padding="1em"
                        disabled={props.onLoading}
                      >
                        Sign up
                      </LinkButton>
                      {props.onLoading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        Already got an account?{' '}
                        <StyledLink to="/login/sign-in">Sign in</StyledLink>
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
