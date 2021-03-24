import React from 'react';
import {
  Button as MuiButton,
  ButtonGroup as MaterialButtonGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import { ArrowForwardIosRounded as ArrowIcon } from '@material-ui/icons';
import { spacing } from '@material-ui/system';
import {
  Theme,
  makeStyles,
  createStyles,
  styled,
} from '@material-ui/core/styles';
import clsx from 'clsx';

// Add margin (m) properties to the button component
const MaterialButton = styled(MuiButton)(spacing);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonGroup: {
      backgroundColor: 'transparent !important',
      '& > *': {
        borderColor: 'transparent !important',
      },
    },
    button: {
      backgroundColor: theme.palette.background.paper,
      height: '60px',
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    arrowIcon: {
      color: theme.palette.text.primary,
    },
  })
);

interface Props {
  buttonData: {
    title: string;
    subTitle?: string;
    icon?: JSX.Element;
    specialRole?: 'error';
  }[];
}

export const VerticalButtonGroup = (props: Props) => {
  const classes = useStyles();
  return (
    <MaterialButtonGroup
      orientation="vertical"
      variant="contained"
      disableElevation={true}
      fullWidth={true}
      className={classes.buttonGroup}
      aria-label="vertical contained primary button group"
    >
      {props.buttonData.map(({ title, subTitle, icon, specialRole }, i) => (
        <MaterialButton
          key={i}
          m={0.1}
          variant="contained"
          className={
            specialRole
              ? clsx(classes.button, classes[specialRole])
              : classes.button
          }
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            {/* Main Layout */}
            <Grid item container direction="row" justify="flex-start" xs>
              {/* Icon Layout */}
              {icon ? (
                <Grid item xs={2}>
                  {icon}
                </Grid>
              ) : null}
              <Grid item container direction="column" xs>
                <Grid item container alignItems="flex-start" xs>
                  <Typography variant="button" color="textPrimary">
                    <b>{title}</b>
                  </Typography>
                </Grid>
                {subTitle ? (
                  <Grid item container alignItems="flex-start" xs>
                    <Typography variant="caption" color="textPrimary">
                      {subTitle}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
            <Grid item container direction="column" alignItems="center" xs={1}>
              <ArrowIcon className={classes.arrowIcon} />
            </Grid>
          </Grid>
        </MaterialButton>
      ))}
    </MaterialButtonGroup>
  );
};
