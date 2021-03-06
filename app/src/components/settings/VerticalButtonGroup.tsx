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
      marginBottom: '1px',
    },
    error: {
      backgroundColor: theme.palette.error.main,
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
    onClick: () => void;
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
      {props.buttonData.map(
        ({ title, subTitle, icon, specialRole, onClick }, i) => (
          <MaterialButton
            key={i}
            variant="contained"
            startIcon={icon ? icon : null}
            endIcon={<ArrowIcon className={classes.arrowIcon} />}
            className={
              specialRole
                ? clsx(classes.button, classes[specialRole])
                : classes.button
            }
            onClick={onClick}
          >
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
          </MaterialButton>
        )
      )}
    </MaterialButtonGroup>
  );
};
