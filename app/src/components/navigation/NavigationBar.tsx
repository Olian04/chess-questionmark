import React from 'react';
import { Container, List, ListItem } from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { PillBar } from './PillBar';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      backgroundColor: theme.palette.primary.main,
      height: '60px',
      width: '100vw',
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
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
    <Container className={classes.banner}>
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
    </Container>
  );
};
