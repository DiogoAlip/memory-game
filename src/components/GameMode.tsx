import right from "../assets/caret-right-solid.svg";
import left from "../assets/caret-left-solid.svg";
import circle from "../assets/circle-xmark-regular.svg";
import { useEffect, useState, memo } from "react";
import { BarGameMode } from "./BarGameMode";
import { PlayersTurns } from "./PlayersTurns";
import { useTime } from "../reducers/useTime.js";
import { TimeMode } from "./TimeMode.jsx";
import { MoveMode } from "./MoveMode.jsx";
import { MultiplayerMode } from "./MultiplayerMode.jsx";

interface GameModeProps {
  restart: (args?: { clicksRestart?: boolean }) => void;
  activeConfiguration: (boolean: boolean) => void;
}

export const GameMode = memo(({ restart, activeConfiguration }: GameModeProps) => {
  const [barState, setBarState] = useState(false);
  const [options, setOptions] = useState(0);
  const [movesRange, setMovesRange] = useState(0);
  const [players, setPlayers] = useState(Array(2).fill(""));
  //usar useContext para este
  const { timeString, timeNumber, onSetTimeByNumber } = useTime(0);
  //user los memos para las funciones y los valores

  useEffect(() => {
    const setConfigurationComprober =
      (movesRange > 0 || !!timeNumber || playersValidator()) && !barState;
    activeConfiguration(setConfigurationComprober);
    if (setConfigurationComprober) restart({ clicksRestart: false });
  }, [movesRange, barState, timeNumber]);

  const RestartGame = ({ time = 0, moves = 0 }: { time?: number; moves?: number }) => {
    onSetTimeByNumber(time);
    setMovesRange(moves);
    setPlayers(Array(2).fill(""));
    setBarState(!!(time || moves) ? barState : !barState);
    setOptions(!!time ? 0 : 1);
    restart();
  };

  const changeOptionsView = (direction: -1 | 1) => {
    setOptions(Math.abs((options + direction)%3));
  };

  const changeOptionsMoves = (direction: -1 | 1) => {
    setMovesRange(Math.abs((movesRange + direction)%6));
  };

  const onChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSetTimeByNumber(Number(event.target.value));
  };

  const onSetPlayers = (eventPlayer: React.ChangeEvent<HTMLInputElement>, newPlayerIndex: number) => {
    const newPlayerName = eventPlayer.target.value;
    const newPlayers = players.map((playerElement, indexPlayers) =>
      indexPlayers == newPlayerIndex ? newPlayerName : playerElement
    );
    setPlayers(newPlayers);
  };

  const playersValidator = () => {
    const totalPlayers = players.filter((name) => name.length);
    if (new Set(totalPlayers).size < totalPlayers.length) return false;
    return totalPlayers.length >= 2;
  };

  return (
    <>
      <button
        onClick={() => {
          setBarState(!barState);
        }}
        className="px-2 py-2.5 font-medium text-[#222222] cursor-pointer transition duration-200 mx-3 pointer-events-auto hover:bg-[#f3efe0] hover:text-[#22a39f] hover:border-[#22a39f]"
      >
        Game Mode
      </button>
      {barState && (
        <div className="fixed top-0 left-0 h-full w-full bg-[#22222280] flex justify-center items-center z-30">
          <div className="fixed w-[40%] min-w-[400px] h-auto bg-[#434343] flex justify-center items-center rounded-[30px]">
            <div className="w-[370px] h-auto my-5 mx-auto">
              <button
                className="h-[30px] w-[30px] bg-transparent border-transparent invert p-0 m-0 hover:invert-[0.15]"
                onClick={() => {
                  setBarState(!barState);
                }}
              >
                <img src={circle} alt={circle} />
              </button>
              <div className="text-[#f3efe0] text-center flex flex-col gap-4">
                <h2 className="text-[#f3efe0]">Configuraciones del juego</h2>
                <hr />
                <div className="flex justify-center items-center">
                  <button
                    className="h-fit w-[30px] bg-transparent border-transparent invert p-0 m-0 hover:invert-[0.15]"
                    onClick={() => changeOptionsView(-1)}
                  >
                    <img src={left} alt={left} />
                  </button>
                  <div className="w-[280px] h-auto">
                    {options === 0 && (
                      <TimeMode
                        timeString={timeString}
                        timeNumber={timeNumber}
                        onChangeRange={onChangeRange}
                        nextOptionsView={() => changeOptionsView(1)}
                        onSetTimeByNumber={onSetTimeByNumber}
                      />
                    )}
                    {options === 1 && (
                      <MoveMode
                        movesRange={movesRange}
                        setMovesRange={setMovesRange}
                        nextOptionsMoves={() => changeOptionsMoves(1)}
                        backOptionsMoves={() => changeOptionsMoves(-1)}
                        nextOptionsView={() => changeOptionsView(1)}
                      />
                    )}
                    {options === 2 && (
                      <MultiplayerMode
                        players={players}
                        onSetPlayers={onSetPlayers}
                        playersValidator={playersValidator}
                        nextOptionsView={() => changeOptionsView(1)}
                        setPlayers={setPlayers}
                      />
                    )}
                  </div>
                  <button
                    className="h-fit w-[30px] bg-transparent border-transparent invert p-0 m-0 hover:invert-[0.15]"
                      onClick={() => changeOptionsView(1)}>
                    <img src={right} alt={right} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(movesRange > 0 || !!timeNumber) && !barState && (
        <BarGameMode
          timeNumber={timeNumber}
          RestartGame={RestartGame}
          movesRange={movesRange}
        />
      )}

      {playersValidator() && !barState && (
        <PlayersTurns players={players} />
      )}
    </>
  );
});
