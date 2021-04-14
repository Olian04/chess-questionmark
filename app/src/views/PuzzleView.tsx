import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { useRecoilValue } from 'recoil';

import { PlayerBar } from '../components/game/PlayerBar';
import { OnePlayerBoard } from '../components/game/OnePlayerBoard';
import { fetchPuzzle, gameState } from '../state/board';
import { Game } from '../types/Game';
import { EndOfGame } from '../components/game/EndOfGame';
import { userState } from '../state/user';
import { LoadingAnimation } from '../components/common/LoadingAnimation';
import { currentMatchData } from '../state/match';

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
  onClickBack: () => void;
  time: number;
  openWinnerDialogue: boolean;
  game: Game | null;
}

export const PuzzleView = (props: Props) => {
  const classes = useStyles();

  return (
    <>
      <EndOfGame
        winner={props.game ? props.game.winner : 'N/A'}
        onClick={props.onClickBack}
        open={props.openWinnerDialogue}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="space-between"
        className={classes.container}
      >
        <PlayerBar
          time={props.time}
          name="Player 1"
          countryCode="SE"
          rating="1900"
          email="test@fest.pest"
        />
        {props.game && (
          <OnePlayerBoard
            onUpdate={props.onUpdate}
            position={props.game.fen}
            player="white"
          />
        )}
        {!props.game && <LoadingAnimation />}

        <PlayerBar
          time={props.time}
          name="Player 2"
          countryCode="SE"
          rating="2000"
          email="test@pest.fest"
        />
      </Box>
      <Box className={classes.background} />
    </>
  );
};
