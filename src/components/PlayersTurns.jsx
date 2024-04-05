import { useState, useEffect } from "react";

export function PlayersTurns({ players, moves }) {
  const totalPlayers = players.filter((name) => name.length);
  const [turn, setTurn] = useState(0);
  const lastTurn = totalPlayers.length - 1;

  useEffect(() => {
    if (moves % 2 != 0) return;
    setTurn(turn == lastTurn ? 0 : turn + 1);
  }, [moves]);

  return (
    <div className="players_turns_bar-container">
      <div className="players_turns_bar">
        <h4>{players[turn]}</h4>
      </div>
    </div>
  );
}
