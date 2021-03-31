import React from 'react';
import { ButtonGroup, ButtonGroupProps } from '@material-ui/core';
import {
  Theme,
  makeStyles,
  createStyles,
  styled,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonGroup: {
      backgroundColor: 'transparent !important',
      '& > *': {
        borderColor: 'transparent !important',
      },
    },
  })
);

export const VerticalButtonGroup = (props: ButtonGroupProps) => {
  const classes = useStyles();
  return (
    <ButtonGroup
      orientation="vertical"
      variant="contained"
      disableElevation={true}
      fullWidth={true}
      className={classes.buttonGroup}
      aria-label="vertical contained primary button group"
      {...props}
    >
      {props.children}
    </ButtonGroup>
  );
};
