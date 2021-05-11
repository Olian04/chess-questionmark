import React, { useEffect, useState } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cursor: {
      backgroundColor: 'rgba(62, 52, 69, 0.4)',
      border: '1px solid rgba(0,0,0,0.5)',
      backgroundBlendMode: 'color-dodge',
      width: 20,
      height: 20,
      borderRadius: 10,
      zIndex: 50,
      position: 'relative',
    },
  })
);

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const CursorProvider = ({ children }: Props) => {
  const classes = useStyles();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const onMouseMove = (event: any) => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const { x, y } = mousePosition;
  console.log(x, y);
  return (
    <>
      <div
        className={classes.cursor}
        style={{ left: `${x}px`, top: `${y}px` }}
      />
      {children}
    </>
  );
};
