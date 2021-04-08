import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

export const LoadingAnimation = () => (
  <Grid container justify="center" alignItems="center" alignContent="center">
    <CircularProgress color="secondary" />
  </Grid>
);
