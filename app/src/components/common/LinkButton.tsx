import React from 'react';
import { Button as BaseButton, ButtonProps } from '@material-ui/core';
import { ArrowForwardIosRounded } from '@material-ui/icons';

interface Props extends ButtonProps {
  width?: string;
  padding?: string;
}

export const LinkButton = (props: Props) => {
  const { children, variant, endIcon, ...innerProps } = props;
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
      {...innerProps}
    >
      {children}
    </BaseButton>
  );
};
