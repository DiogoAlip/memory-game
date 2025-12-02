import right from "../assets/caret-right-solid.svg";
import left from "../assets/caret-left-solid.svg";
import circle from "../assets/circle-xmark-regular.svg";
import { useEffect, useState } from "react";
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

export const GameMode = ({ restart, activeConfiguration }: GameModeProps) => {
  const [barState, setBarState] = useState(false);
  const [options, setOptions] = useState(0);
  const [movesRange, setMovesRange] = useState(0);
  const [players, setPlayers] = useState(Array(4).fill(""));
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
    setPlayers(Array(4).fill(""));
    setBarState(!!(time || moves) ? barState : !barState);
    setOptions(!!time ? 0 : 1);
    restart();
  };

  const backOptionsView = () => {
    setOptions(options === 0 ? 2 : options - 1);
  };

  const nextOptionsView = () => {
    setOptions(options === 2 ? 0 : options + 1);
  };

  const onChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSetTimeByNumber(Number(event.target.value));
  };

  const backOptionsMoves = () => {
    setMovesRange(movesRange === 0 ? 5 : movesRange - 1);
  };

  const nextOptionsMoves = () => {
    setMovesRange(movesRange === 5 ? 0 : movesRange + 1);
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
    if (new Set(totalPlayers).size < totalPlayers.length) return 0;
    return totalPlayers.length < 2 ? 0 : 1;
  };

  return (
    <>
      <button
        onClick={() => {
          setBarState(!barState);
        }}
      >
        Game Mode
      </button>
      {barState && (
        <div className="modal">
          <div className="text-container">
            <div className="text">
              <button
                className="exit-button"
                onClick={() => {
                  setBarState(!barState);
                }}
              >
                <img src={circle} alt={circle} />
              </button>
              <div className="modal-header">
                <h2>Configuraciones del juego</h2>
                <hr />
                <div className="game-mode_options-menu">
                  <button className="exit-button" onClick={backOptionsView}>
                    <img src={left} alt={left} />
                  </button>
                  {options === 0 && (
                    <TimeMode
                      timeString={timeString}
                      timeNumber={timeNumber}
                      onChangeRange={onChangeRange}
                      nextOptionsView={nextOptionsView}
                      onSetTimeByNumber={onSetTimeByNumber}
                    />
                  )}
                  {options === 1 && (
                    <MoveMode
                      movesRange={movesRange}
                      setMovesRange={setMovesRange}
                      nextOptionsMoves={nextOptionsMoves}
                      backOptionsMoves={backOptionsMoves}
                      nextOptionsView={nextOptionsView}
                    />
                  )}
                  {options === 2 && (
                    <MultiplayerMode
                      players={players}
                      onSetPlayers={onSetPlayers}
                      playersValidator={playersValidator}
                      nextOptionsView={nextOptionsView}
                      setPlayers={setPlayers}
                    />
                  )}
                  <button className="exit-button" onClick={nextOptionsView}>
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

      {playersValidator() > 0 && !barState && (
        <PlayersTurns players={players} />
      )}
    </>
  );
};
