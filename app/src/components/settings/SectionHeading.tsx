import React from 'react';
import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  ListItemProps,
} from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.background.paper,
      '& > *': {
        color: theme.palette.text.primary,
      },
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
      <ListItemAvatar>
        <Avatar
          alt={`${title} Icon`}
          variant="rounded"
          className={classes.avatar}
        >
          {icon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Grid item container direction="column" xs>
          <Grid item container alignItems="flex-start" xs>
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
