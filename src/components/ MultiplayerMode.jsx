import { ConfigurationsButtons } from "./ConfigurationButtons";
export const MultiplayerMode = ({
  players,
  onSetPlayers,
  playersValidator,
  nextOptionsView,
  setPlayers,
}) => {
  return (
    <div>
      <h4>Multijugador</h4>
      <form className="players-name_container" name="players">
        {players.map((playerName, playerIndex) => (
          <input
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
