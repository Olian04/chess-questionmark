import React, { useEffect, useState } from 'react';
import {
  Box,
  Button as MaterialButton,
  Grid,
  Typography,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
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
      left: '2px',
      position: 'relative',
      backgroundColor: theme.palette.primary.main,
      transition: 'left 0.3s ease-in-out',
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
  const [pillPosition, setPillPosition] = useState(2);
  const pillRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    if (pillRef.current && pillSize.w === 0 && pillSize.h === 0) {
      const currentPillWidth = pillRef.current.clientWidth / props.items.length;
      const currentPillHeight = pillRef.current.clientHeight;
      setPillSize({ w: currentPillWidth, h: currentPillHeight });
    }
  });

  const handleOnClick = (onClick: () => void, i: number) => {
    setPillPosition(2 + i * pillSize.w);
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
              onClick={() => handleOnClick(item.onClick, i)}
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
          className={classes.sliderButton}
          style={{ width: pillSize.w, height: pillSize.h, left: pillPosition }}
        ></Box>
      </Box>
    </Box>
  );
};
