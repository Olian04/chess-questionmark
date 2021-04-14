import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GameBoard } from './GameBoard';
import { Chess, Square } from 'chess.js';
import { Game } from '../../types/Game';
import { Winner } from '../../types/Winner';

interface Props {
  position: string;
  player?: 'white' | 'black';
  onUpdate: (game: Game) => void;
}

type SquareStylingProps = {
  pieceSquare: Square;
  history: Array<{ from: Square; to: Square }>;
};

const squareStyling = ({ pieceSquare, history }: SquareStylingProps) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: 'cornFlowerBlue' },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: 'cornFlowerBlue',
      },
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: 'cornFlowerBlue',
      },
    }),
  };
};

class TwoPlayerState extends Component<Props> {
  static propTypes = { children: PropTypes.func };

  state = {
    fen: this.props.position,
    dropSquareStyle: {},
    squareStyles: {},
    pieceSquare: '' as Square,
    square: '',
    history: [],
    draggable: true,
    evaluation: [],
    winner: '' as Winner,
  };

  game: any;

  componentDidMount() {
    this.game = new Chess(this.state.fen);
    this.setState({
      draggable:
        (this.game.turn() === 'w' ? 'white' : 'black') === this.props.player,
    });
  }

  updateCallback() {
    this.props.onUpdate({
      turn: this.game.turn(),
      fen: this.state.fen,
      winner: this.state.winner,
    });
  }

  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }: SquareStylingProps) => ({
      squareStyles: squareStyling({ pieceSquare, history }),
    }));
  };

  highlightSquare = (sourceSquare: Square, squaresToHighlight: Square[]) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, b) => {
        return {
          ...a,
          ...{
            [b]: {
              background:
                'radial-gradient(circle, cornFlowerBlue 36%, transparent 40%)',
              borderRadius: '50%',
            },
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare,
          }),
        };
      },
      {}
    );

    this.setState(({ squareStyles }: { squareStyles: Object }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles },
    }));
  };

  onDrop = ({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: Square;
    targetSquare: Square;
  }) => {
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return;

    return new Promise((resolve) => {
      this.setState(({ history, pieceSquare }: SquareStylingProps) => ({
        fen: this.game.fen(),
        history: this.game.history({ verbose: true }),
        squareStyles: squareStyling({ pieceSquare, history }),
      }));
      this.removeHighlightSquare();
      this.setState({
        draggable: false,
      });
      if (this.game.in_checkmate()) {
        this.setState({
          winner: this.props.player,
        });
      }
      this.updateCallback();
      resolve(undefined);
    });
  };

  onMouseOverSquare = (square: Square) => {
    if (!this.state.draggable) return;

    let moves = this.game.moves({
      square: square,
      verbose: true,
    });

    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = () => this.removeHighlightSquare();

  onDragOverSquare = () => {
    this.setState({
      dropSquareStyle: { backgroundColor: 'cornFlowerBlue' },
    });
  };

  onSquareClick = (square: Square) => {
    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: 'q',
    });

    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: '',
    });
  };

  render() {
    const {
      fen,
      dropSquareStyle,
      squareStyles,
      draggable,
      winner,
    } = this.state;

    return (
      <GameBoard
        position={fen}
        onDrop={this.onDrop}
        onMouseOverSquare={this.onMouseOverSquare}
        onMouseOutSquare={this.onMouseOutSquare}
        squareStyles={squareStyles}
        dropSquareStyle={dropSquareStyle}
        onDragOverSquare={this.onDragOverSquare}
        onSquareClick={this.onSquareClick}
        draggable={draggable}
        orientation={this.props.player}
        winner={winner}
      />
    );
  }
}

export const TwoPlayerBoard = (props: Props) => {
  return (
    <>
      <TwoPlayerState
        onUpdate={props.onUpdate}
        position={props.position}
        player={props.player}
      />
    </>
  );
};
