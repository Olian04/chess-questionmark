import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const StyledLink = (props: LinkProps) => {
  const theme = useTheme();
  const { children, ...innerProps } = props;
  return (
    <Link
      style={{
        textDecoration: 'none',
        display: 'inline-block',
        color: theme.palette.secondary.main,
      }}
      {...innerProps}
    >
      {children}
    </Link>
  );
};
