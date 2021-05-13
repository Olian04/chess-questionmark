import React, { useEffect, useState } from 'react';
import {
  Box,
  Button as MaterialButton,
  Grid,
  Typography,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { useWindowSize } from '@react-hook/window-size';
import { useRecoilValue } from 'recoil';
import { pillState } from '../../state/pill';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      position: 'relative',
      height: theme.measurements.navbar.height / 2,
    },
    background: {
      backgroundColor: 'transparent',
      borderColor: theme.palette.primary.dark,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
    },
    slider: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.primary.dark,
      position: 'relative',
      pointerEvents: 'none',
    },
    sliderButton: {
      borderRadius: theme.shape.borderRadius,
      position: 'relative',
      backgroundColor: theme.palette.primary.main,
      transition: 'left 0.3s ease-in-out, opacity 0.5s ease',
    },
    button: {
      backgroundColor: 'transparent',
      zIndex: 1,
      width: '100%',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    active: {
      backgroundColor: theme.palette.primary.main,
    },
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  })
);

interface Props {
  items: {
    title: string;
    active: boolean;
    onClick: () => void;
  }[];
}

export const PillBar = (props: Props) => {
  const classes = useStyles();
  const [pillSize, setPillSize] = useState({ w: 0, h: 0 });
  const [width, _] = useWindowSize();
  const [pillPosition, setPillPosition] = useState(2);

  const currentPill = useRecoilValue(pillState);

  const pillRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    if (pillRef.current) {
      const currentPillWidth = pillRef.current.clientWidth / props.items.length;
      const currentPillHeight = pillRef.current.clientHeight;
      setPillSize({ w: currentPillWidth, h: currentPillHeight });
      setPillPosition(2 + currentPill * currentPillWidth);
    }
  }, [width, currentPill]);

  const handleOnClick = (onClick: () => void) => {
    setPillPosition(2 + currentPill * pillSize.w);
    onClick();
  };
  return (
    <Box className={classes.container}>
      <Grid
        container
        className={classes.background}
        justify="center"
        alignContent="stretch"
        alignItems="stretch"
        ref={pillRef}
      >
        {props.items.map((item, i) => (
          <Grid item key={i} xs>
            <MaterialButton
              variant="contained"
              disableElevation={true}
              className={classes.button}
              onClick={() => handleOnClick(item.onClick)}
            >
              <Typography variant="caption" color="textPrimary">
                {item.title}
              </Typography>
            </MaterialButton>
          </Grid>
        ))}
      </Grid>
      <Box className={classes.slider} style={{ top: -1 * pillSize.h - 2 }}>
        <Box
          className={clsx(
            classes.sliderButton,
            currentPill === -1 ? classes.hidden : classes.visible
          )}
          style={{ width: pillSize.w, height: pillSize.h, left: pillPosition }}
        ></Box>
      </Box>
    </Box>
  );
};
