import { Props as cbjsxProps } from 'chessboardjsx';

export interface BoardProps extends cbjsxProps {
  winner: 'white' | 'black' | 'draw' | 'N/A';
}
