import React from 'react';
import { Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { BoardProps } from '../types/Board';
import { PlayerBar } from '../components/game/PlayerBar';
import { GameBoard } from '../components/game/GameBoard';
import { Snackbar } from '../components/common/Snackbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      height: '100vh',
      width: '100vw',
      position: 'absolute',
      top: 0,
      left: 0,
      background: 'linear-gradient(180deg, #918F99 14.58%, #28262F 79.69%)',
      zIndex: 0,
    },
    container: {
      zIndex: 1,
      position: 'relative',
      height: `calc(100% - ${theme.spacing(3)}px)`,
      paddingTop: theme.spacing(1),
    },
  })
);

interface Props {
  boardProps: BoardProps;
  topTime: number;
  botTime: number;
}

export const GameView = (props: Props) => {
  const classes = useStyles();

  return (
    <>
      <Snackbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="space-between"
        className={classes.container}
      >
        <PlayerBar
          time={props.topTime}
          name="Player 1"
          email="test@test.yes"
          countryCode="SE"
          rating="1900"
        />
        <GameBoard {...props.boardProps} />
        <PlayerBar
          time={props.botTime}
          name="Player 2"
          email="test@test.no"
          countryCode="SE"
          rating="2000"
        />
      </Box>
      <Box className={classes.background} />
    </>
  );
};
