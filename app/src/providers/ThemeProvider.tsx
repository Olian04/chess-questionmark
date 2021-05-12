import React, { useEffect, useRef } from 'react';
/** Suggestion for keeping strictmode and still be able to use
 * components that apparently use findDOMNode
 * See https://stackoverflow.com/questions/61220424/material-ui-drawer-finddomnode-is-deprecated-in-strictmode */
import {
  createMuiTheme,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/core/styles';
import { useRecoilValue } from 'recoil';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    measurements: {
      navbar: {
        height: React.CSSProperties['height'];
        width: React.CSSProperties['width'];
        breakpoint: Breakpoint;
      };
      playerbar: {
        height: React.CSSProperties['height'];
        width: React.CSSProperties['width'];
        breakpoint: Breakpoint;
      };
    };
  }
  interface ThemeOptions {
    measurements?: {
      navbar?: {
        height?: React.CSSProperties['height'];
        width?: React.CSSProperties['width'];
        breakpoint?: Breakpoint;
      };
      playerbar: {
        height?: React.CSSProperties['height'];
        width?: React.CSSProperties['width'];
        breakpoint?: Breakpoint;
      };
    };
  }
}

import { colorThemeState } from '../state/colorTheme';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

const darkTheme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 350,
      md: 720,
      lg: 1080,
      xl: 1920,
    },
  },
  palette: {
    type: 'dark',
    background: {
      default: '#28262F',
      paper: '#3F3E43',
    },
    primary: {
      main: '#543C52',
      dark: '#361D32',
      contrastText: 'rgba(247,246,244,1)',
    },
    secondary: {
      main: 'rgba(237,210,203,1)',
      contrastText: 'rgba(63, 62, 67, 1)',
    },
    info: {
      main: 'rgba(63,62,67,1)',
    },
    text: {
      primary: 'rgba(247,246,244,1)',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'Poppins',
      'sans-serif',
      'Segoe UI Emoji',
    ].join(','),
    fontSize: 12,
    h4: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
  overrides: {
    MuiInputBase: {
      input: {
        background: 'rgba(63, 62, 67, 1)',
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  measurements: {
    navbar: {
      height: 60,
      width: '100%',
    },
    playerbar: {
      height: 25,
      width: '100%',
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
  const theme = useRecoilValue(colorThemeState);

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

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  return (
    <MaterialThemeProvider theme={theme}>
      {props.children}
    </MaterialThemeProvider>
  );
};
