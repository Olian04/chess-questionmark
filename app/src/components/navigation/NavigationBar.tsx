import React from 'react';
import { Container, List, ListItem } from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { PillBar } from './PillBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      backgroundColor: theme.palette.primary.main,
      height: theme.measurements.navbar.height,
      width: theme.measurements.navbar.width,
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      zIndex: 1,
      position: 'relative',
    },
  })
);

interface Props {
  menuItems: {
    title: string;
    active: boolean;
    path: string;
  }[];
}

export const NavigationBar = (props: Props) => {
  const classes = useStyles();

  return (
    <Container className={classes.banner}>
      <List>
        <ListItem>
          <PillBar items={props.menuItems} />
        </ListItem>
      </List>
    </Container>
  );
};
