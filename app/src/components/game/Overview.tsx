import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import { CancelSharp, KeyboardBackspace } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: '0.5em',
      height: theme.measurements.navbar.height,
      display: 'flex',
      flexDirection: 'column',
    },
    wrapper: {
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '10px',
      paddingRight: '10px',
      borderRadius: '8px',
      width: '100%',
      backgroundColor: theme.palette.primary.main,
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'space-between',
    },
    text: {
      fontWeight: 500,
    },
    floatRight: {
      float: 'right',
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
    <Box px={1} my={1} className={classes.container}>
      <Box className={classes.wrapper}>
        <Button
          variant="text"
          startIcon={props.isReplay ? <KeyboardBackspace /> : <CancelSharp />}
          onClick={props.handleResign}
        >
          {props.isReplay ? 'Go Back' : 'Resign'}
        </Button>
        <Box>
          <Typography className={classes.text}>
            Turn: {props.currentPlayerIsHuman ? 'Yours' : 'AI'}
          </Typography>
          <Typography
            variant="caption"
            color="textPrimary"
            className={classes.floatRight}
          >
            Move #{props.currentMove}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
