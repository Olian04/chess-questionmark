import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import { CancelSharp, KeyboardBackspace } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: '0.5em',
      height: theme.measurements.playerbar.height,
    },
    wrapper: {
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '10px',
      paddingRight: '10px',
      borderRadius: '8px',
      width: '100%',
      backgroundColor: theme.palette.primary.main,
    },
    text: {
      fontWeight: 500,
    },
  })
);

interface Props {
  currentMove: number;
  currentPlayerIsHuman: boolean;
  handleResign: () => void;
  isReplay?: boolean;
}
export const Overview = (props: Props) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      px={1}
      my={1}
      alignItems="center"
      className={classes.container}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.wrapper}
      >
        <Button
          variant="text"
          startIcon={props.isReplay ? <KeyboardBackspace /> : <CancelSharp />}
          onClick={props.handleResign}
        >
          {props.isReplay ? 'Profile' : 'Resign'}
        </Button>
        <Box>
          <Typography className={classes.text}>
            Current turn: {props.currentPlayerIsHuman ? 'Yours' : 'AI'}
          </Typography>
          <Typography variant="caption" color="textPrimary">
            Move #{props.currentMove}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
