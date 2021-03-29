import React, { useEffect, useRef, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useWindowWidth } from '@react-hook/window-size/throttled';

interface Props {
  position: string;
}

export const GameBoard = (props: Props) => {
  const theme = useTheme();
  const windowWidth = useWindowWidth();
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [boardWidth, setBoardWidth] = useState(0);

  useEffect(() => {
    if (boardContainerRef.current === null) return;
    const { width } = boardContainerRef.current.getBoundingClientRect();

    console.log(width);
    setBoardWidth(width);
  }, [boardContainerRef, windowWidth]);

  return (
    <Box
      /*@ts-ignore*/
      ref={boardContainerRef}
    >
      <Chessboard
        position={props.position}
        boardStyle={{
          boxShadow: theme.shadows[10],
        }}
        calcWidth={() => boardWidth}
        lightSquareStyle={{ backgroundColor: theme.palette.secondary.main }}
        darkSquareStyle={{ backgroundColor: theme.palette.primary.main }}
      />
    </Box>
  );
};
