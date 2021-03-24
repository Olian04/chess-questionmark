import React from 'react';
import {
  createMuiTheme,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/core/styles';
import { useRecoilValue } from 'recoil';

import { colorTheme } from '../state/colorTheme';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#28262F',
      paper: '#3F3E43',
    },
    error: {
      main: '#DF5049',
    },
    primary: {
      main: '#543C52',
    },
    secondary: {
      main: '#361D32',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

const useTheme = () => {
  const theme = useRecoilValue(colorTheme);

  switch (theme) {
    case 'dark':
      return darkTheme;
    case 'light':
      return lightTheme;
    default:
      console.error(
        `Unknown color theme. Expected "light" or "dark" but got "${theme}"`
      );
      return darkTheme;
  }
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ThemeProvider = (props: Props) => {
  const theme = useTheme();
  return (
    <MaterialThemeProvider theme={theme}>
      {props.children}
    </MaterialThemeProvider>
  );
};
