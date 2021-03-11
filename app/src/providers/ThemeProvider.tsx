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
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
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
