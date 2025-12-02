import { ConfigurationsButtons } from "./ConfigurationButtons";
interface MultiplayerModeProps {
  players: string[];
  onSetPlayers: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  playersValidator: () => number;
  nextOptionsView: () => void;
  setPlayers: (players: string[]) => void;
}

export const MultiplayerMode = ({
  players,
  onSetPlayers,
  playersValidator,
  nextOptionsView,
  setPlayers,
}: MultiplayerModeProps) => {
  return (
    <div>
      <h4>Multijugador</h4>
      <form className="mb-4" name="players">
        {players.map((playerName, playerIndex) => (
          <input
            className="border-0 outline-none my-1 rounded-[5px] h-[18px] bg-[#222222] text-[#f3efe0] p-1 focus:border-2 focus:my-[2px]"
            placeholder={`player ${playerIndex + 1}`}
            type="text"
            value={playerName}
            key={`${playerIndex}`}
            maxLength={20}
            onChange={(event) => onSetPlayers(event, playerIndex)}
          />
        ))}
      </form>
      <ConfigurationsButtons
        values={playersValidator()}
        onNextAplication={nextOptionsView}
        onCancel={() => {
          setPlayers(Array(4).fill(""));
        }}
      />
    </div>
  );
};
