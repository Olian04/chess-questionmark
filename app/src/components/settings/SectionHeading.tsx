import React from 'react';
import { Grid, ListItem, ListItemText, Typography } from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      marginRight: '7px',
    },
  })
);

interface Props {
  title: string;
  subTitle: string;
  icon: JSX.Element;
}

export const SectionHeading = (props: Props) => {
  const classes = useStyles();
  const { title, subTitle, icon } = props;
  return (
    <ListItem style={{ width: '100%' }}>
      <ListItemText>
        <Grid item container direction="column" xs>
          <Grid item container alignItems="flex-start" xs>
            <Grid className={classes.avatar}>{icon}</Grid>

            <Typography variant="button" color="textPrimary">
              <b>{title}</b>
            </Typography>
          </Grid>
          <Grid item container alignItems="flex-start" xs>
            <Typography variant="caption" color="textPrimary">
              {subTitle}
            </Typography>
          </Grid>
        </Grid>
      </ListItemText>
    </ListItem>
  );
};
