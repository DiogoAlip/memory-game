import { memo, useContext, useEffect, useState } from "react";
import { EndGameModal } from "./EndGameModal";
import movesIcon from "../assets/hand-pointer-regular.svg";
import timeIcon from "../assets/hourglass-regular.svg";
import { WinnerContext } from "../context/WinnerContext";
import { WinnerModal } from "./WinnerModal";
import { ClicksContext } from "../context/ClicksContext";

export const BarGameMode = memo(({ timeNumber, movesRange, restartGame }) => {
  const { winner, setWinner } = useContext(WinnerContext);
  const { clicks, setClicks } = useContext(ClicksContext);
  const moves = clicks % 2;
  const LimitMoves = movesRange * 5 + 15;
  const [movesLeft, setMovesLeft] = useState(LimitMoves - moves + 1);

  const LimitTime =
    Math.round(timeNumber / 2) * 60 + (timeNumber % 2 === 0 ? 30 : 0);
  const [totalSeconds, setTotalSeconds] = useState(LimitTime);

  const convertTimeString = (timeInSeconds) =>
    `${parseInt(timeInSeconds / 60)}:${timeInSeconds % 60 < 10 ? 0 : ""}${
      timeInSeconds % 60
    }`;

  useEffect(() => {
    if (!movesRange || (!totalSeconds && !!timeNumber) || winner) return;
    const movesState = moves === 0 ? 1 : 0;
    setMovesLeft(movesLeft - movesState);
  }, [moves, winner]);

  useEffect(() => {
    if (!timeNumber || (!movesLeft && !!movesRange) || winner) {
      return;
    }
    if (totalSeconds === 0) {
      return;
    }
    const timeID = setTimeout(() => {
      setTotalSeconds(totalSeconds - 1);
    }, 1000);
    return () => {
      clearTimeout(timeID);
    };
  }, [totalSeconds, winner]);

  return (
    <div className="game_bar-container">
      <div className="game_bar">
        {!!timeNumber && (
          <h4>
            <img src={timeIcon} alt="" />: {convertTimeString(totalSeconds)}
            <button
              className="button-restart_mode"
              onClick={() => restartGame({ moves: movesRange ?? 0 })}
            >
              Reanudar
            </button>
          </h4>
        )}
        {!!movesRange && (
          <h4>
            <img src={movesIcon} alt="" />: {movesLeft}
            <button
              className="button-restart_mode"
              onClick={() => restartGame({ time: timeNumber ?? 0 })}
            >
              Reanudar
            </button>
          </h4>
        )}
      </div>
      {((!totalSeconds && !!timeNumber) || (!movesLeft && !!movesRange)) &&
        !winner && (
          <EndGameModal
            moves={movesRange ? LimitMoves : moves}
            time={timeNumber ? convertTimeString(LimitTime) : null}
            resetGame={() => {
              setClicks(0);
              restartGame({ time: timeNumber ?? 0, moves: movesRange ?? 0 });
              setMovesLeft(LimitMoves + 1);
              setTotalSeconds(LimitTime);
            }}
          />
        )}
      {winner && (
        <WinnerModal
          moves={moves}
          resetGame={() => {
            restartGame({ time: timeNumber ?? 0, moves: movesRange ?? 0 });
            setMovesLeft(LimitMoves + 1);
            setTotalSeconds(LimitTime);
            setWinner(null);
          }}
        />
      )}
    </div>
  );
});
