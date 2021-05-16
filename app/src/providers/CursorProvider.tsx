import React, { createContext, useRef } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { isBrowser } from 'react-device-detect';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cursor: {
      left: 0,
      top: 0,
      position: 'fixed',
      backgroundColor: 'rgba(62, 52, 69, 0.4)',
      border: '1px solid rgba(255,255,255,0.5)',
      backgroundBlendMode: 'color-dodge',
      width: 25,
      height: 25,
      borderRadius: 12.5,
      zIndex: 1500,
      opacity: 0,
      pointerEvents: 'none',
      willChange: 'transform',
    },
  })
);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MouseContext = createContext({
  onMouseMove: (e: any) => {},
  onMouseEnter: (e: any) => {},
  onMouseLeave: (e: any) => {},
  cursor: () => {},
});

export const CursorProvider = ({ children }: Props) => {
  const classes = useStyles();

  const onMouseMove = (event: any) => {
    const { pageX: x, pageY: y } = event;
    if (mouseRef.current && isBrowser) {
      mouseRef.current.style.transform = `translate(${x - 12.5}px,${
        y - 12.5
      }px)`;
    }
  };

  const onMouseLeave = (event: any) => {
    if (mouseRef.current && isBrowser) {
      mouseRef.current.style.opacity = '0';
    }
  };
  const onMouseEnter = (event: any) => {
    if (mouseRef.current && isBrowser) {
      mouseRef.current.style.opacity = '1';
    }
  };
  const cursor = () => {
    return isBrowser ? 'none' : 'auto';
  };

  const mouseRef = useRef<HTMLDivElement>(null);
  return (
    <MouseContext.Provider
      value={{
        onMouseMove,
        onMouseLeave,
        onMouseEnter,
        cursor,
      }}
    >
      {children}
      <div ref={mouseRef} className={classes.cursor} />
    </MouseContext.Provider>
  );
};
