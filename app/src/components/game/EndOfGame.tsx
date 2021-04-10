import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

interface Props {
  winner: string;
}

export const EndOfGame = (props: Props) => {
  const theme = useTheme();

  const [winner, setWinner] = useState('');
  useEffect(() => {
    setWinner(props.winner);
  }, [props.winner]);

  const handleClose = () => {
    setWinner('');
  };

  return (
    <Dialog open={winner} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          winner is {winner}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>
          Return to profile!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
