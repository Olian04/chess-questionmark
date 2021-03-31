import React from 'react';
import { Button as BaseButton, ButtonProps } from '@material-ui/core';
import {
  Theme,
  makeStyles,
  createStyles,
  styled,
} from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import { ArrowForwardIosRounded } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
  })
);

interface Props extends ButtonProps {
  width?: string;
  padding?: string; // TODO: Figure out if this clashes with the "spacing" system. See end of file.
}

const LinkButton__Internal = (props: Props) => {
  const classes = useStyles();
  const { children, variant, endIcon, className, ...innerProps } = props;
  return (
    <BaseButton
      variant={variant ? variant : 'contained'}
      endIcon={endIcon ? endIcon : <ArrowForwardIosRounded />}
      style={{
        minWidth: innerProps?.width,
        paddingTop: innerProps?.padding,
        paddingBottom: innerProps?.padding,
        justifyContent: 'space-between',
        textTransform: 'none',
      }}
      className={clsx(className || '', classes.button)}
      {...innerProps}
    >
      {children}
    </BaseButton>
  );
};

// Add spacing properties to the component
export const LinkButton = styled(LinkButton__Internal)(spacing);
