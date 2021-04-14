import React, { useState } from 'react';
import { Slider, Button, Box } from '@material-ui/core';
import {
  Theme,
  makeStyles,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import { PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';

import { PlayerBar } from '../components/game/PlayerBar';
import { GameBoard } from '../components/game/GameBoard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      zIndex: 1,
      position: 'relative',
      height: `calc(100% - ${theme.spacing(3)}px)`,
      paddingTop: theme.spacing(1),
    },
    background: {
      height: '100vh',
      width: '100vw',
      position: 'absolute',
      top: 0,
      left: 0,
      background: 'linear-gradient(180deg, #918F99 14.58%, #28262F 79.69%)',
      zIndex: 0,
    },
  })
);

const ReplaySlider = withStyles({
  root: {
    height: 4,
  },
  track: {
    color: '#F1E8E6',
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: 'primary',
    border: '3px solid #F1E8E6',
    marginTop: -9,
  },
  rail: {
    height: 4,
    color: '#F1E8E6',
  },
})(Slider);

export const ReplayView = () => {
  const classes = useStyles();
  const [turn, setTurn] = useState(1);
  const [intervalID, setIntervalID] = useState(0);
  const [playing, setPlaying] = useState(false);
  const hist = [
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
    'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
  ];

  const play = () => {
    let t = turn;
    setIntervalID(
      setInterval(() => {
        if (t >= hist.length) return;
        setTurn(++t);
        console.log(t);
      }, 2000)
    );
    setPlaying(true);
  };

  const pause = () => {
    clearInterval(intervalID);
    setPlaying(false);
  };

  const playPause = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
  };

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
          email=""
          time={0}
          name="Player 1"
          countryCode="SE"
          rating="1900"
        />
        <GameBoard
          position={hist[turn - 1]}
          transitionDuration={400}
          draggable={false}
          size={0.8}
          winner={''}
        />
        <Box>
          <Box display="flex" justifyContent="center">
            <Button
              disabled={turn <= 1}
              variant="outlined"
              onClick={() => setTurn(turn - 1)}
            >
              <SkipPrevious fontSize="large" color="action" />
            </Button>
            <Button variant="outlined" onClick={() => playPause()}>
              <PlayArrow fontSize="large" color="action" />
            </Button>
            <Button
              disabled={turn >= hist.length}
              variant="outlined"
              onClick={() => setTurn(turn + 1)}
            >
              <SkipNext fontSize="large" color="action" />
            </Button>
          </Box>

          <ReplaySlider
            marks={true}
            min={1}
            max={hist.length}
            value={turn}
            onChange={(_, v) => setTurn(v as number)}
          />
        </Box>

        <PlayerBar
          email=""
          time={0}
          name="Player 2"
          countryCode="SE"
          rating="2000"
        />
      </Box>
      <Box className={classes.background} />
    </>
  );
};
