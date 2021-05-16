import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import LogoIcon from '/favicon.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    info: {
      width: '36em',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(4),
      display: 'flex',
      borderRadius: theme.shape.borderRadius,
    },
    row: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    column: {
      flexDirection: 'column',
    },
    highlight: {
      color: theme.palette.primary.light,
    },
    leftContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

export const WelcomeCard = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12} lg={8} className={classes.leftContainer}>
      <Box className={clsx(classes.info, classes.row)}>
        <Box>
          <Typography
            variant="h2"
            align="left"
            gutterBottom
            color="textPrimary"
          >
            Welcome to <span className={classes.highlight}>chess?</span>
          </Typography>
          <Typography variant="h6" align="left" color="textPrimary">
            <span className={classes.highlight}>chess?</span> is definitely best
            viewed on a mobile phone.
          </Typography>
          <Typography variant="subtitle2" align="left" color="textPrimary">
            Try it out on your mobile, or here. The experience will be the same.
          </Typography>
        </Box>

        <img src={LogoIcon} alt="Page Logo" width="100px" />
      </Box>
    </Grid>
  );
};
