import React, { useState } from 'react';
import {
  Box,
  Checkbox,
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
  })
);

const SignupSchema = Yup.object().shape({});

export const SignUpView = () => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

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
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
            }}
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
                        <img src={Logo} />
                      </Hidden>

                      <Typography variant="h4" align="center">
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
                      required
                      fullWidth
                      id="ingameName"
                      label="In-game Name"
                      onChange={props.handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RoundedTextField
                      color="secondary"
                      autoComplete="email"
                      name="email"
                      variant="filled"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      onChange={props.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RoundedTextField
                      color="secondary"
                      variant="filled"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={props.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormGroup column>
                      <FormControl
                        required
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
                      <FormHelperText>
                        {props.errors.agreeOnTerms
                          ? props.errors.agreeOnTerms
                          : ''}
                      </FormHelperText>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: '2em' }}>
                    <LinkButton
                      type="submit"
                      fullWidth
                      color="secondary"
                      padding="1em"
                    >
                      Sign up
                    </LinkButton>
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
