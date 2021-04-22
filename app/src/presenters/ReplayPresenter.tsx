import React, { useState, useEffect } from 'react';
import { ReplayView } from '../views/ReplayView';

export const ReplayPresenter = () => {
  const [turn, setTurn] = useState(1);
  const [intervalID, setIntervalID] = useState(0);
  const [playing, setPlaying] = useState(false);
  const hist = [
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
    'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
  ];

  const play = () => {
    let t = turn;
    setIntervalID(
      setInterval(() => {
        setTurn(++t);
      }, 2000)
    );
    setPlaying(true);
  };

  const pause = () => {
    clearInterval(intervalID);
    setPlaying(false);
  };

  const playPause = () => {
    if (playing) {
      pause();
    } else {
      if (turn >= hist.length) return;
      play();
    }
  };

  const previous = () => {
    setTurn(turn - 1);
    pause();
  };

  const next = () => {
    setTurn(turn + 1);
    pause();
  };

  const sliderUpdate = (v: number) => {
    setTurn(v);
    pause();
  };

  useEffect(() => {
    if (turn >= hist.length) {
      pause();
    }
  }, [turn]);

  return (
    <ReplayView
      fen={hist[turn - 1]}
      turn={turn}
      start={turn <= 1}
      end={turn >= hist.length}
      onPrevious={() => previous()}
      onPlay={() => playPause()}
      onNext={() => next()}
      onSlider={(v: number) => sliderUpdate(v)}
      max={hist.length}
      playing={playing}
    />
  );
};
