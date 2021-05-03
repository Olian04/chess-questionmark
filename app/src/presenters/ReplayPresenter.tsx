import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { getMaterialCostFromFen } from '../services/chess';
import { getStorageGameByID } from '../services/firebase/storage';
import { profileState, requestProfile, userHydrateState } from '../state/user';
import { LoadingView } from '../views/LoadingView';
import { ReplayView } from '../views/ReplayView';

type Player = {
  name: string;
  email: string;
  countryCode: string;
  rating: number;
  playerIsWhite: boolean;
};

export const ReplayPresenter = () => {
  const [turn, setTurn] = useState(1);
  const [intervalID, setIntervalID] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gameHistory, setGameHistory] = useState<string[]>([]);
  const [gameOwner, setGameOwner] = useState(true);
  const [player, setPlayer] = useState<Player>();
  const [materialData, setMaterialData] = useState<number[]>([]);

  const { id: gameID } = useParams<{ id: string }>();

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
      if (turn >= gameHistory.length) return;
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

  const history = useHistory();

  const hydrateGame = useRecoilCallback(({ snapshot }) => async () => {
    const user = await snapshot.getPromise(userHydrateState);
    const userProfile = await snapshot.getPromise(requestProfile);
    const game = await getStorageGameByID(gameID);

    if (
      game &&
      (game.winner.name === user.name || game.loser.name === user.name)
    ) {
      const userInfo = {
        name: user.name,
        email: user.email,
        countryCode: user.countryCode,
        rating: userProfile.rank,
        playerIsWhite: game.history[0]?.split(' ')?.[1] === 'w' ?? true,
      };
      setPlayer(userInfo);
      setGameOwner(true);
      setGameHistory(game.history);

      const materialData = game.history.map(getMaterialCostFromFen);
      setMaterialData(materialData);

      return;
    }

    setGameOwner(false);
    setTimeout(() => history.push('/play'), 2500);
  });

  useEffect(() => {
    if (turn >= gameHistory.length) {
      pause();
    }
  }, [turn]);

  useEffect(() => {
    (async () => await hydrateGame())();
  }, []);

  return (
    <>
      {gameOwner && gameHistory.length > 0 ? (
        <ReplayView
          fen={gameHistory[turn - 1]}
          turn={turn}
          start={turn <= 1}
          end={turn >= gameHistory.length}
          onPrevious={() => previous()}
          onPlay={() => playPause()}
          onNext={() => next()}
          onSlider={(v: number) => sliderUpdate(v)}
          max={gameHistory.length}
          playing={playing}
          player={player as Player}
          handleGoBack={() => history.push('/play')}
          materialData={[0, ...materialData]}
        />
      ) : gameOwner && gameHistory.length === 0 ? (
        <LoadingView message="Fetching game" />
      ) : (
        <LoadingView message="Foreign ID! Redirecting.." />
      )}
    </>
  );
};
