import { memo, useContext, useEffect, useState } from "react";
import { EndGameModal } from "./EndGameModal";
import movesIcon from "../assets/hand-pointer-regular.svg";
import timeIcon from "../assets/hourglass-regular.svg";
import { WinnerContext } from "../context/WinnerContext";
import { WinnerModal } from "./WinnerModal";
import { ClicksContext } from "../context/ClicksContext";

interface BarGameModeProps {
  timeNumber: number;
  movesRange: number;
  RestartGame: (args: { time?: number; moves?: number }) => void;
}

export const BarGameMode = memo(({ timeNumber, movesRange, RestartGame }: BarGameModeProps) => {
  const { winner, setWinner } = useContext(WinnerContext);
  const { clicks, setClicks } = useContext(ClicksContext);
  const moves = clicks % 2;
  const LimitMoves = movesRange * 5 + 15;
  const [movesLeft, setMovesLeft] = useState(LimitMoves - moves + 1);

  const LimitTime =
    Math.round(timeNumber / 2) * 60 + (timeNumber % 2 === 0 ? 30 : 0);
  const [totalSeconds, setTotalSeconds] = useState(LimitTime);

  const convertTimeString = (timeInSeconds: number) =>
    `${Math.floor(timeInSeconds / 60)}:${timeInSeconds % 60 < 10 ? 0 : ""}${
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
    <div className="top-0 left-0 w-0 h-full absolute flex items-end bg-transparent">
      <div className="h-auto flex flex-col bg-[#222222] text-[#f3efe0] rounded-r-[10px] pb-2.5">
        {!!timeNumber && (
          <h4 className="p-2.5 w-[80px] text-center m-0 group">
            <img src={timeIcon} alt="" className="invert h-[20px] mr-[5px] translate-y-[5px]" />: {convertTimeString(totalSeconds)}
            <button
              className="text-[14px] font-semibold my-3 px-2.5 py-2 border-solid bg-[#434343] text-[#f3efe0] hidden group-hover:block"
              onClick={() => RestartGame({ moves: movesRange ?? 0 })}
            >
              Reinicio
            </button>
          </h4>
        )}
        {!!movesRange && (
          <h4 className="p-2.5 w-[80px] text-center m-0 group">
            <img src={movesIcon} alt="" className="invert h-[20px] mr-[5px] translate-y-[5px]" />: {movesLeft}
            <button
              className="text-[14px] font-semibold my-3 px-2.5 py-2 border-solid bg-[#434343] text-[#f3efe0] hidden group-hover:block"
              onClick={() => RestartGame({ time: timeNumber ?? 0 })}
            >
              Reinicio
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
              RestartGame({ time: timeNumber ?? 0, moves: movesRange ?? 0 });
              setMovesLeft(LimitMoves + 1);
              setTotalSeconds(LimitTime);
            }}
          />
        )}
      {winner && (
        <WinnerModal
          moves={moves}
          resetGame={() => {
            RestartGame({ time: timeNumber ?? 0, moves: movesRange ?? 0 });
            setMovesLeft(LimitMoves + 1);
            setTotalSeconds(LimitTime);
            setWinner(null);
          }}
        />
      )}
    </div>
  );
});
