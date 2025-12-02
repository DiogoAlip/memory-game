import { ConfigurationsButtons } from "./ConfigurationButtons";
interface TimeModeProps {
  timeString: string;
  timeNumber: number;
  onChangeRange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nextOptionsView: () => void;
  onSetTimeByNumber: (number: number) => void;
}

export const TimeMode = ({
  timeString,
  timeNumber,
  onChangeRange,
  nextOptionsView,
  onSetTimeByNumber,
}: TimeModeProps) => {
  return (
    <div>
      <h4>Tiempo de Juego</h4>
      <input
        className="border-0 outline-none my-1 rounded-[5px] h-[18px] bg-[#222222] text-[#f3efe0] p-1 focus:border-2 focus:my-[2px]"
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
