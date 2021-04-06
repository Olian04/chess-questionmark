import React, { useEffect, useRef, useState, Component } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import PropTypes from "prop-types";
import { GameBoard } from './GameBoard';
import { Chess } from 'chess.js';

const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "cornFlowerBlue" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "cornFlowerBlue"
      }
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "cornFlowerBlue"
      }
    })
  };
};

class TwoPlayerState extends Component {
  static propTypes = { children: PropTypes.func };

  state = {
    fen: this.props.position || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    dropSquareStyle: {},
    squareStyles: {},
    pieceSquare: "",
    square: "",
    history: [],
    draggable: true,
    evaluation: [],
  }

  componentDidMount() {
    this.game = new Chess(this.state.fen);
    this.setState({
      draggable: (this.game.turn() === "w" ? "white" : "black") === this.props.player
    });
    // init firebase listener
  }

  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
    }));
  };

  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, b) => {
        return {
          ...a,
          ...{
            [b]: {
              background:
                "radial-gradient(circle, cornFlowerBlue 36%, transparent 40%)",
              borderRadius: "50%"
            }
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare
          })
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles }
    }));
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return;

    return new Promise(resolve => {
      this.setState(({ history, pieceSquare }) => ({
        fen: this.game.fen(),
        history: this.game.history({ verbose: true }),
        squareStyles: squareStyling({ pieceSquare, history }),
      }));
      this.removeHighlightSquare();
      this.setState({
        draggable: false
      });
      resolve();
    });
    // write to firebase
  };

  onMouseOverSquare = square => {
    if (!this.state.draggable) return;

    let moves = this.game.moves({
      square: square,
      verbose: true
    });

    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = square => this.removeHighlightSquare(square);

  onDragOverSquare = square => {
    this.setState({
      dropSquareStyle: { backgroundColor: "cornFlowerBlue" }
    });
  };

  onSquareClick = square => {
    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q"
    });

    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: ""
    });
  };

  render() {
    const { fen, dropSquareStyle, squareStyles, draggable } = this.state;

    return this.props.children({
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick,
      onSquareRightClick: this.onSquareRightClick,
      draggable,
    });
  }
}

interface Props {
  position: string;
  player: string;
}

export const TwoPlayerBoard = (props: Props) => {
  return (
    <>
      <TwoPlayerState position={props.position} player={props.player}>
        {({
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          draggable,
        }) => (
          <GameBoard
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            draggable={draggable}
            orientation={props.player}
          />
        )}
      </TwoPlayerState>
    </>
  );
}
