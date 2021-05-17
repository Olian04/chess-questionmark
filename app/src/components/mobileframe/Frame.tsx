import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';

import lock from '/lock.svg';
import battery from '/battery.svg';
import cellular from '/cellular.svg';
import wifi from '/wifi.svg';
import { useSearchbar } from '../../hooks/use-searchbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    browserWrapper: {
      height: 650,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      aspectRatio: '6 / 13',
      width: 300,

      backgroundImage: 'url(/iphone12maxpro.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      boxSizing: 'content-box',
      padding: 15,
    },
    browserContainer: {
      borderRadius: 40,
      height: 'calc(100% - 6px)',
      overflowY: 'auto',
      position: 'relative',
      scrollbarWidth: 'none', // only mozilla
      backgroundColor: theme.palette.background.default,
      maskImage: 'url(/mask.svg)',
      maskSize: 'cover',
      maskRepeat: 'no-repeat',
      //cursor: 'none !important',
    },
    searchbar: {
      width: '100%',
      minHeight: 43,
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'content-box',
      backgroundColor: '#35373A',
      position: 'relative',
      zIndex: 1300,
      paddingBottom: theme.spacing(0.5),
    },
    statusbar: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing(0.7),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(0.5),
      fontSize: '0.8em',
      color: theme.palette.text.primary,
    },
    adressbar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    adress: {
      display: 'flex',
      color: '#83E576',
      fontSize: '0.7em',
    },
    notifications: {
      display: 'flex',
      justifyContent: 'space-around',
      height: '1em',
      paddingTop: theme.spacing(0.5),
    },
  })
);

interface Props {
  children: JSX.Element;
}

export const Frame = (props: Props) => {
  const classes = useStyles();
  const [time, href] = useSearchbar();

  return (
    <Grid container item xs={12} lg={4} alignItems="center" direction="column">
      <Box className={classes.browserWrapper}>
        <Box className={classes.browserContainer}>
          <Box className={classes.searchbar}>
            <Box className={classes.statusbar}>
              {time}
              <Box className={classes.notifications}>
                <img src={cellular} />
                <img src={wifi} />
                <img src={battery} />
              </Box>
            </Box>
            <Box className={classes.adressbar}>
              <Box className={classes.adress}>
                <img src={lock} style={{ marginRight: 4 }} />
                {href}
              </Box>
            </Box>
          </Box>
          {props.children}
        </Box>
      </Box>
    </Grid>
  );
};
