import React from 'react';
import { Button as BaseButton } from '@material-ui/core';
import { ArrowForwardIosRounded } from '@material-ui/icons';

interface Props {
  color?: any;
  children: any;
  width?: string;
  padding?: string;
  onClick?: () => void;
}

export const LinkButton = (props: Props) => {
  return (
    <BaseButton
      variant="contained"
      color={props?.color}
      endIcon={<ArrowForwardIosRounded />}
      onClick={props.onClick}
      style={{
        minWidth: props?.width,
        paddingTop: props?.padding,
        paddingBottom: props?.padding,
        justifyContent: 'space-between',
        textTransform: 'none',
      }}
    >
      {props.children}
    </BaseButton>
  );
};
