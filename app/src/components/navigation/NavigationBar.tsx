import React from 'react';
import { Box, List, ListItem } from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { PillBar } from './PillBar';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      backgroundColor: theme.palette.primary.main,
      height: theme.measurements.navbar.height,
      width: theme.measurements.navbar.width,
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      zIndex: 1400,
      top: 0,
      left: 0,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      position: 'sticky',
    },
  })
);

interface Props {
  menuItems: {
    title: string;
    to: string;
  }[];
}

export const NavigationBar = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  return (
    <Box className={classes.banner}>
      <List>
        <ListItem>
          <PillBar
            items={props.menuItems.map((item) => ({
              title: item.title,
              active: location.pathname === item.to,
              onClick: () => history.push(item.to),
            }))}
          />
        </ListItem>
      </List>
    </Box>
  );
};
