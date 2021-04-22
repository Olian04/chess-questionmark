import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Gravatar } from '../common/Gravatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timer: {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderRadius: '20%/50%',
      height: '22px',
      width: '80px',
      paddingLeft: '5px',
      paddingRight: '5px',
    },
    text: {
      fontWeight: 'bold',
    },
    timerText: {
      paddingLeft: '3px',
    },
    avatar: {
      borderWidth: '3px',
      borderColor: '#F7F6F4',
      border: 'solid',
    },
    container: {
      height: theme.measurements.playerbar.height,
    },
  })
);

interface Props {
  name: string;
  email: string;
  rating: number;
  countryCode: string;
  time: number;
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

      <Box
        color="textPrimary"
        className={classes.timer}
        flexShrink={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <AccessTimeIcon color="action" />
        <Typography
          color="textPrimary"
          className={clsx(classes.text, classes.timerText)}
        >
          {(props.time - (props.time % 60)) / 60}:{props.time % 60}
        </Typography>
      </Box>
    </Box>
  );
};
