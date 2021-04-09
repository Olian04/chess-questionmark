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
import { RoundedTextField } from '../components/common/RoundedTextField';
import Logo from '/sign-up-logo.svg';
import { LinkButton } from '../components/common/LinkButton';
import { StyledLink } from '../components/common/CustomLink';
import * as Yup from 'yup';
import { signUp } from '../services/firebase/auth';
import { green } from '@material-ui/core/colors';
import { userState } from '../state/user';
import { useSetRecoilState } from 'recoil';
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
  })
);

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short')
    .max(20, 'Name is too long')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password needs to be atleast 8 characters long')
    .required('Password is required'),
  agreeOnTerms: Yup.boolean().oneOf([true], 'Term of conditions are required'),
});

export const SignUpView = () => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const setCredential = useSetRecoilState(userState);

  const handleCheckbox = (
    formik: any,
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setChecked(checked);
    formik.handleChange(event);
  };

  return (
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
              if (!loading) {
                try {
                  setLoading(true);
                  const user = await signUp({
                    email: values.email,
                    password: values.password,
                  });
                  if (user) {
                    setCredential({ ...user, name: 'test' });
                  }
                } catch ({ code, message }) {
                  actions.setSubmitting(false);
                  switch (code) {
                    case 'auth/email-already-in-use':
                      actions.setErrors({ email: message });
                      break;
                  }
                }
                setLoading(false);
              }
            }}
            validationSchema={SignupSchema}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
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
                      onChange={props.handleChange}
                      error={props.errors.name ? true : false}
                      helperText={props.errors.name ? props.errors.name : ''}
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
                      onChange={props.handleChange}
                      error={props.errors.email ? true : false}
                      helperText={props.errors.email ? props.errors.email : ''}
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
                  <Grid item xs={12}>
                    <FormGroup>
                      <FormControl
                        error={props.errors.agreeOnTerms ? true : false}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={(event, checked) =>
                                handleCheckbox(props, event, checked)
                              }
                              value={props.values.agreeOnTerms}
                              name="agreeOnTerms"
                            />
                          }
                          label={
                            <Typography>
                              I agree to the{' '}
                              <StyledLink to="#">Terms</StyledLink> and <br />
                              <StyledLink to="#">Privacy Policy</StyledLink>
                            </Typography>
                          }
                        />
                      </FormControl>
                      <FormHelperText
                        error={props.errors.agreeOnTerms ? true : false}
                      >
                        {props.errors.agreeOnTerms
                          ? props.errors.agreeOnTerms
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
                      disabled={loading}
                    >
                      Sign up
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
  );
};
