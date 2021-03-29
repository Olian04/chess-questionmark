import React from 'react';
import { Avatar, Typography, Box } from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timer: {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
      height: '25px',
      width: '80px',
    },
  })
);

interface Props {
  name: string;
  rating: string;
  icon: string;
}

export const PlayerBar = (props: Props) => {
  const classes = useStyles();
  return (
    <Box display="flex" p={1} my={2} alignItems="center" bgcolor="transparent">
      <Box display="flex" width="100%">
        <Box p={1}>
          <Avatar alt={props.name} variant="circular" src={props.icon} />
        </Box>
        <Box p={1}>
          <Typography color="textPrimary">{props.name}</Typography>
          <Typography variant="caption" color="textPrimary">
            Rating: {props.rating}
          </Typography>
        </Box>
      </Box>
      <Box
        color="textPrimary"
        className={classes.timer}
        flexShrink={1}
        display="flex"
      >
        <AccessTimeIcon color="action" />
        <Typography color="textPrimary">15:00</Typography>
      </Box>
    </Box>
  );
};
