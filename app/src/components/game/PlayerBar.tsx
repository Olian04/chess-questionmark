import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Gravatar } from '../common/Gravatar';
import { Pill } from './Pill';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      borderWidth: '3px',
      borderColor: '#F7F6F4',
      border: 'solid',
    },
    container: {
      height: theme.measurements.playerbar.height,
    },
    text: {
      fontWeight: 'bold',
    },
  })
);

interface Props {
  name: string;
  email: string;
  rating: number;
  countryCode: string;
  time: number;
  isPaused: boolean;
}

export const PlayerBar = (props: Props) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      px={1}
      my={1}
      alignItems="center"
      className={classes.container}
    >
      <Box display="flex" width="100%">
        <Box p={1}>
          <Gravatar
            alt={props.name}
            variant="circular"
            className={classes.avatar}
          />
        </Box>
        <Box p={1}>
          <Typography color="textPrimary" className={classes.text}>
            {props.name}
          </Typography>
          <Box display="flex" alignItems="center" marginTop="-2px">
            <Typography variant="caption" color="textPrimary">
              Rating: {props.rating}
            </Typography>
            <img
              style={{ paddingLeft: '5px' }}
              src={`https://ipdata.co/flags/${props.countryCode.toLowerCase()}.png`}
              height="20px"
            />
          </Box>
        </Box>
      </Box>
      <Pill time={props.time} isPaused={props.isPaused} />
    </Box>
  );
};
