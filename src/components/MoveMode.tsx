import right from "../assets/caret-right-solid.svg";
import left from "../assets/caret-left-solid.svg";
import { ConfigurationsButtons } from "./ConfigurationButtons";
interface MoveModeProps {
  movesRange: number;
  setMovesRange: (moves: number) => void;
  nextOptionsMoves: () => void;
  backOptionsMoves: () => void;
  nextOptionsView: () => void;
}

export const MoveMode = ({
  movesRange,
  setMovesRange,
  nextOptionsMoves,
  backOptionsMoves,
  nextOptionsView,
}: MoveModeProps) => {
  return (
    <div>
      <h4>Numero de movimientos</h4>
      <div className="p-2.5 flex box-border justify-center gap-4">
        <button className="h-[30px] w-[30px] bg-transparent border-transparent invert p-0 m-0 hover:invert-[0.15]" onClick={backOptionsMoves}>
          <img src={left} alt={left} />
        </button>
        <h3>{movesRange === 0 ? "None" : movesRange * 5 + 15}</h3>
        <button className="h-[30px] w-[30px] bg-transparent border-transparent invert p-0 m-0 hover:invert-[0.15]" onClick={nextOptionsMoves}>
          <img src={right} alt={right} />
        </button>
      </div>
      <ConfigurationsButtons
        values={movesRange}
        onNextAplication={nextOptionsView}
        onCancel={() => {
          setMovesRange(0);
        }}
      />
    </div>
  );
};
