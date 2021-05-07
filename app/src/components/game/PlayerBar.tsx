import React from 'react';
import { Typography, Box, Avatar } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Pill } from './Pill';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarWhite: {
      boxShadow: `0 0 0 0.15em #F7F6F4, 0 0 1.2em 0.15em ${theme.palette.primary.main}`,
    },
    avatarBlack: {
      boxShadow: `0 0 0 0.15em #28262F, 0 0 1.2em 0.15em ${theme.palette.primary.main}`,
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
  avatar: string;
  rating: number;
  countryCode: string;
  time: number;
  isPaused: boolean;
  isBlinking: boolean;
  playerIsWhite: boolean;
  isReplay?: boolean;
  timeRef?: React.MutableRefObject<HTMLParagraphElement | undefined>;
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
          <Avatar
            alt={props.name}
            variant="circular"
            className={
              props.playerIsWhite ? classes.avatarWhite : classes.avatarBlack
            }
            src={props.avatar}
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
            {props.countryCode ? (
              <img
                style={{ paddingLeft: '5px' }}
                src={`https://ipdata.co/flags/${props.countryCode.toLowerCase()}.png`}
                height="10px"
              />
            ) : null}
          </Box>
        </Box>
      </Box>
      {props.isReplay ? (
        ''
      ) : (
        <Pill
          timeRef={props.timeRef}
          time={props.time}
          isPaused={props.isPaused}
          isBlinking={props.isBlinking}
        />
      )}
    </Box>
  );
};
