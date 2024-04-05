import right from "../assets/caret-right-solid.svg";
import left from "../assets/caret-left-solid.svg";
import { ConfigurationsButtons } from "./ConfigurationButtons";
export const MoveMode = ({
  movesRange,
  setMovesRange,
  nextOptionsMoves,
  backOptionsMoves,
  nextOptionsView,
}) => {
  return (
    <div>
      <h4>Numero de movimientos</h4>
      <div className="moves-setter">
        <button className="exit-button" onClick={backOptionsMoves}>
          <img src={left} alt={left} />
        </button>
        <h3>{movesRange === 0 ? "None" : movesRange * 5 + 15}</h3>
        <button className="exit-button" onClick={nextOptionsMoves}>
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
