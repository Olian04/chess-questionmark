import React from 'react';
import { Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { BoardProps } from '../types/BoardProps';
import { PlayerBar } from '../components/game/PlayerBar';
import { GameBoard } from '../components/game/GameBoard';
import { Overview } from '../components/game/Overview';
import { isMobile } from 'react-device-detect';
import { User } from '../types/User';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: 'linear-gradient(180deg, #918F99 14.58%, #28262F 79.69%)',
      zIndex: 0,
    },
    fill: {
      position: 'relative',
      right: theme.spacing(1),
      left: theme.spacing(1),
      height: `calc(100% - ${theme.measurements.navbar.height}px)`,
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      zIndex: 1,
      position: 'relative',
      height: '100%',
      paddingTop: theme.spacing(1),
    },
  })
);

interface Props {
  user: User;
  boardProps: BoardProps;
  topTime: number;
  botTime: number;
  player: {
    name: string;
    email: string;
    countryCode: string;
    rating: number;
    playerIsWhite: boolean;
  };
  previousPlayer: string;
  currentMove: number;
  handleResign: () => void;
  isPaused: boolean;
  isBlinking: boolean;
  timeRef: React.MutableRefObject<HTMLParagraphElement | undefined>;
}

export const GameView = (props: Props) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.fill}>
        <Box className={classes.container}>
          <Overview
            currentPlayerIsHuman={props.currentMove % 2 === 1}
            currentMove={props.currentMove}
            handleResign={props.handleResign}
          />
          <GameBoard {...props.boardProps} />
          <PlayerBar
            timeRef={props.timeRef}
            time={props.botTime}
            name={props.player.name}
            avatar={props.user.avatar}
            countryCode={props.player.countryCode}
            rating={props.player.rating}
            isPaused={props.isPaused}
            isBlinking={props.isBlinking}
            playerIsWhite={props.player.playerIsWhite}
          />
        </Box>
      </Box>
      <Box className={classes.background} />
    </>
  );
};
