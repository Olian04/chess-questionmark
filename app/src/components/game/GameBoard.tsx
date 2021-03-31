import React from 'react';
import Chessboard from 'chessboardjsx';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useWindowWidth } from '@react-hook/window-size';

interface Props {
  position: string;
  size?: number;
}

export const GameBoard = (props: Props) => {
  const theme = useTheme();

  const navHeight = 60;
  const playerBarHeight = 25;
  const difference = 50 + navHeight + 2 * playerBarHeight;

  return (
    <Box display="flex" justifyContent="center">
      <Chessboard
        position={props.position}
        boardStyle={{
          boxShadow: theme.shadows[10],
        }}
        calcWidth={({ screenHeight, screenWidth }) =>
          Math.min(screenHeight - difference, screenWidth) *
          (props.size ? props.size : 0.9)
        }
        lightSquareStyle={{ backgroundColor: theme.palette.secondary.main }}
        darkSquareStyle={{ backgroundColor: theme.palette.primary.main }}
      />
    </Box>
  );
};
