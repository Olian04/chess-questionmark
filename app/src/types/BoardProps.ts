import { Props as cbjsxProps } from 'chessboardjsx';
import { Winner } from './Winner';

export interface BoardProps extends cbjsxProps {
  winner: Winner;
}
