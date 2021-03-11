import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  ExposurePlus1 as IncrementIcon,
  ExposureNeg1 as DecrementIcon,
} from '@material-ui/icons';

import { globalCount, doubleGlobalCount } from '../state/counter';

export const DemoRoute = () => {
  const [count, setCount] = useRecoilState(globalCount);
  const doubleCount = useRecoilValue(doubleGlobalCount);

  const increment = () => setCount((curr) => curr + 1);
  const decrement = () => setCount((curr) => curr - 1);

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={3}>
        <Card>
          <CardHeader title="Count" />
          <CardContent>
            <Typography color="textSecondary">Count = {count}</Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={increment}>
              <IncrementIcon color="primary" />
            </IconButton>
            <IconButton onClick={decrement}>
              <DecrementIcon color="primary" />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card>
          <CardHeader title="Double Count" />
          <CardContent>
            <Typography color="textSecondary">
              Count x2 = {doubleCount}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={increment}>
              <IncrementIcon color="primary" />
            </IconButton>
            <IconButton onClick={decrement}>
              <DecrementIcon color="primary" />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
