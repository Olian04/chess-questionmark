import React from 'react';
import {
  Grid,
  Typography,
  Box,
} from '@material-ui/core';
import Chessboard from 'chessboardjsx';

interface Props {
  lightSquare: string;
  darkSquare: string;
  position: string;
}

export const GameBoard = (props: Props) => {
  return (
    <Chessboard
      position={props.position}
      boardStyle={{
        borderRadius: '5px',
        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
      }}
      lightSquareStyle={{ backgroundColor: '#EDD2CB' }}
      darkSquareStyle={{ backgroundColor: '#543C52' }}
    />
  );
}
