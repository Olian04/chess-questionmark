import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { getFlag } from '../../services/ipdata';
import { GameBoard } from '../game/GameBoard';

interface Props {
  fen: string;
  size: number;
  player: {
    name: string;
    email: string;
    countryCode: string;
    rating: number;
    playerIsWhite: boolean;
  };
}
export const ReplayComponent = (props: Props) => {
  return (
    <Box display="flex" alignItems="stretch" flexDirection="column">
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        px={4.5}
      >
        <Typography align="center" variant="overline">
          {props.player.name} · {props.player.rating}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <img src={getFlag(props.player.countryCode)} height="10px" />
        </Box>
      </Box>

      <GameBoard
        position={props.fen}
        transitionDuration={400}
        draggable={false}
        size={0.6}
      />
    </Box>
  );
};
