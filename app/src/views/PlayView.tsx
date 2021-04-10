import React, { useEffect } from 'react';
import {
  Grid,
  Typography,
  ListItem,
  List,
  Box,
  ButtonGroup,
  Paper,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { Tile } from '../components/play/Tile';
import { Button } from '../components/play/Button';
import { useHistory } from 'react-router';
// import { boardState } from '../state/board';

import MatchIcon from '/matchicon.svg';
import AiIcon from '/aiicon.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fillHeight: {
      height: '100%',
      paddingLeft: '15px',
      paddingRight: '15px',
      flexWrap: 'nowrap',
    },
    button: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.contrastText,
    },
    paper: {
      textAlign: 'center',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2),
    },
  })
);

export const PlayView = () => {
  const classes = useStyles();
  const history = useHistory();
  // const fen = useRecoilValue(boardState);

  // const startPuzzle = useRecoilCallback(({ snapshot, set }) => async () => {
  //   fetch('https://api.chess.com/pub/puzzle/random', {
  //     "method": "GET"
  //   }).then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     } else {
  //       throw res;
  //     }
  //   }).then(res => {
  //     set(boardState, res.fen);
  //
  //   });
  //   history.push('/game');
  // });

  const startPuzzle = () => {
    history.push('/game');
  };

  return (
    <Grid
      container
      direction="column"
      className={classes.fillHeight}
      spacing={1}
      justify="flex-start"
    >
      <Grid xs item>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ height: '100%' }}
        >
          <Typography variant="h5">Lets see what you go for Bob!</Typography>
        </Grid>
      </Grid>
      <Grid xs item>
        <Grid container direction="column" spacing={1}>
          <Button
            text="Create a match"
            subText="Start a regular match"
            icon={MatchIcon}
          />
          <Button
            text="Join a match"
            subText={
              <p>
                There are currently <b>18</b> rooms open
              </p>
            }
            icon={MatchIcon}
          />
          <Button
            onClick={startPuzzle}
            text="Beat our AI"
            subText="Battle your way up from a randomized blunder"
            icon={AiIcon}
          />
        </Grid>
      </Grid>
      <Grid xs item style={{ zIndex: 1 }}>
        <Grid
          container
          justify="space-between"
          spacing={1}
          style={{ height: '100%' }}
          alignContent="flex-end"
        >
          <Grid item xs={12} sm={6}>
            <Tile text="104291" subText="Players" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tile text="41665" subText="Games in play" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
