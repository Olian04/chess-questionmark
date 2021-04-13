import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { LoadingAnimation } from '../components/common/LoadingAnimation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    wrapper: {
      maxHeight: '150px',
      maxWidth: '150px',
    },
  })
);

interface Props {
  message: string;
}
export const LoadingView = (props: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        <LoadingAnimation />
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          {props.message}
        </Typography>
      </Box>
    </Box>
  );
};
