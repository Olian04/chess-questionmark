import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { useRecoilValue } from 'recoil';

import { PlayerBar } from '../components/game/PlayerBar';
import { OnePlayerBoard } from '../components/game/OnePlayerBoard';
import { TwoPlayerBoard } from '../components/game/TwoPlayerBoard';
import { GameBoard } from '../components/game/GameBoard';
import { fetchPuzzle } from '../state/board';
import { Game } from '../types/Game';

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
  onUpdate: (game: Game) => void;
  time: number;
}

export const PuzzleView = (props: Props) => {
  const classes = useStyles();
  const fen = useRecoilValue(fetchPuzzle);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="space-between"
        className={classes.container}
      >
        <PlayerBar
          time={props.time}
          email=""
          name="Player 1"
          countryCode="SE"
          rating="1900"
        />
        <OnePlayerBoard
          onUpdate={props.onUpdate}
          position={fen}
          player="white"
        />
        <PlayerBar
          time={props.time}
          email=""
          name="Player 2"
          countryCode="SE"
          rating="2000"
        />
      </Box>
      <Box className={classes.background} />
    </>
  );
};
