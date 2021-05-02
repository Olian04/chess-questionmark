import React, { useState } from 'react';
import { Slider, Button, Box } from '@material-ui/core';
import {
  Theme,
  makeStyles,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@material-ui/icons';
import { PlayerBar } from '../components/game/PlayerBar';
import { GameBoard } from '../components/game/GameBoard';
import { Overview } from '../components/game/Overview';
import { Graph } from '../components/replay/Graph';

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
    wrapper: {
      position: 'relative',
      top: 0,
      left: 0,
      width: '100%',
      marginTop: '15px',
    },
    graph: {
      position: 'absolute',
      zIndex: 0,
      top: 0,
      left: 0,
      height: '60px',
      width: '100%',
      transform: 'translateY(-25%)',
    },
  })
);

const ReplaySlider = withStyles({
  root: {
    height: 4,
    zIndex: 2,
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

interface Props {
  fen: string;
  turn: number;
  onPrevious: () => void;
  onPlay: () => void;
  onNext: () => void;
  onSlider: (v: number) => void;
  start: boolean;
  end: boolean;
  max: number;
  playing: boolean;
  player: {
    name: string;
    email: string;
    countryCode: string;
    rating: number;
    playerIsWhite: boolean;
  };
  handleGoBack: () => void;
  materialData: number[];
}

export const ReplayView = (props: Props) => {
  const classes = useStyles();
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="space-between"
        className={classes.container}
      >
        <Overview
          currentMove={props.turn}
          currentPlayerIsHuman={props.turn % 2 === 1}
          handleResign={props.handleGoBack}
          isReplay
        />
        <GameBoard
          position={props.fen}
          transitionDuration={400}
          draggable={false}
          size={0.8}
          winner={''}
        />
        <Box>
          <Box display="flex" justifyContent="center">
            <Button
              disabled={props.start}
              variant="outlined"
              onClick={props.onPrevious}
            >
              <SkipPrevious fontSize="large" color="action" />
            </Button>
            <Button variant="outlined" onClick={props.onPlay}>
              {!props.playing ? (
                <PlayArrow fontSize="large" color="action" />
              ) : (
                <Pause fontSize="large" color="action" />
              )}
            </Button>
            <Button
              disabled={props.end}
              variant="outlined"
              onClick={props.onNext}
            >
              <SkipNext fontSize="large" color="action" />
            </Button>
          </Box>
          <Box className={classes.wrapper}>
            <ReplaySlider
              marks={true}
              min={1}
              max={props.max}
              value={props.turn}
              onChange={(_, v) => props.onSlider(v as number)}
            />
            <Box className={classes.graph}>
              <Graph data={props.materialData} />
            </Box>
          </Box>
        </Box>

        <PlayerBar
          email={props.player.email}
          time={0}
          name={props.player.name}
          countryCode={props.player.countryCode}
          rating={props.player.rating}
          isPaused={true}
          isBlinking={false}
          playerIsWhite={props.player.playerIsWhite}
        />
      </Box>
      <Box className={classes.background} />
    </>
  );
};
