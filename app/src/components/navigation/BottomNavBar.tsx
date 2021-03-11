import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  Restore as RestoreIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationOnIcon,
} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

// TODO: Figure out why material ui is throwing "BottomNavigation_default is not defined"
export const BottomNavBar = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <BottomNavigation
      value={'/demo'}
      onChange={(event, newValue) => {
        navigateTo(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Demo"
        value="/demo"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Dummy"
        value="/dummy"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Something else"
        value="/something/else"
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
  );
};
