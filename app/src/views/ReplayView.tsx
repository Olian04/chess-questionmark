import React, { useState } from 'react';
import { Grid, Slider, Button } from '@material-ui/core';
import {
  Theme,
  makeStyles,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import { PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';

import { PlayerBar } from '../components/game/PlayerBar';
import { ReplayBoard } from '../components/game/ReplayBoard';
import { GameBoard } from '../components/game/GameBoard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
    },
    background: {
      background: 'linear-gradient(180deg, #918F99 14.58%, #28262F 79.69%)',
    },
  })
);

const ReplaySlider = withStyles({
  root: {
    padding: '13px',
  },
  track: {
    color: '#fff',
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: 'primary',
    border: '1px solid #fff',
    marginTop: -9,
    marginLeft: -11,
  },
})(Slider);

export const ReplayView = () => {
  const classes = useStyles();
  const [turn, setTurn] = useState(1);
  const [intervalID, setIntervalID] = useState(0);
  const [playing, setPlaying] = useState(false);
  const hist = [
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2",
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"
  ];

  const play = () => {
    let t = turn;
    setIntervalID(setInterval(() => {
      if (t >= hist.length) return;
      setTurn(++t);
      console.log(t);
    }, 2000));
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
    <Grid container justify="space-between" className={classes.container}>
      <Grid item xs={12}>
        <PlayerBar name="Player 1" rating="1900" icon="/assets/cat.jpg" />
      </Grid>
      <Grid item xs={12}>
        <GameBoard position={hist[turn-1]} transitionDuration={400} draggable={false} />
      </Grid>
      <Grid item container xs={12} justify="center">
        <Button disabled={turn <= 1} variant="outlined" onClick={() => setTurn(turn - 1)}>
          <SkipPrevious fontSize="large" color="action" />
        </Button>
        <Button variant="outlined" onClick={() => playPause()}>
          <PlayArrow fontSize="large" color="action" />
        </Button>
        <Button disabled={turn >= hist.length} variant="outlined" onClick={() => setTurn(turn + 1)}>
          <SkipNext fontSize="large" color="action" />
        </Button>
      </Grid>
      <ReplaySlider marks={true} min={1} max={hist.length} value={turn} onChange={(e, v) => setTurn(v)} />
      <Grid item xs={12}>
        <PlayerBar name="Player 2" rating="2000" icon="/assets/cat.jpg" />
      </Grid>
    </Grid>
  );
};
