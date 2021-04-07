import React, { useEffect, useRef, useState } from 'react';
import Chessboard, { Props as cbjsxProps } from 'chessboardjsx';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

interface Props extends cbjsxProps {
  size?: number;
}

export const GameBoard = (props: Props) => {
  const theme = useTheme();
  const navHeight = theme.measurements.navbar.height
    ? parseInt(theme.measurements.navbar.height.toString())
    : 60;
  const playerBarHeight = theme.measurements.playerbar.height
    ? parseInt(theme.measurements.playerbar.height.toString())
    : 25;

  const difference = navHeight + 2 * playerBarHeight;

  return (
    <Box display="flex" justifyContent="center">
      <Chessboard
        {...props}
        boardStyle={{
          boxShadow: theme.shadows[10],
        }}
        calcWidth={({ screenHeight, screenWidth }) =>
          Math.min(screenHeight - difference, screenWidth) *
          (props.size ? props.size : 0.8)
        }
        lightSquareStyle={{ backgroundColor: theme.palette.secondary.main }}
        darkSquareStyle={{ backgroundColor: theme.palette.primary.main }}
      />
    </Box>
  );
};
