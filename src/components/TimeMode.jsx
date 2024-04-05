import { ConfigurationsButtons } from "./ConfigurationButtons";
export const TimeMode = ({
  timeString,
  timeNumber,
  onChangeRange,
  nextOptionsView,
  onSetTimeByNumber,
}) => {
  return (
    <div>
      <h4>Tiempo de Juego</h4>
      <input
        type="range"
        name="game_time"
        min="0"
        max="6"
        value={timeNumber}
        onChange={(event) => onChangeRange(event)}
      />
      <h4>{timeString}</h4>
      <ConfigurationsButtons
        values={timeNumber}
        onNextAplication={nextOptionsView}
        onCancel={() => {
          onSetTimeByNumber(0);
        }}
      />
    </div>
  );
};
