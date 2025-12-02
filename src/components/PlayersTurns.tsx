import { useState, useEffect } from "react";

interface PlayersTurnsProps {
  players: string[];
  moves?: number; // moves is used in useEffect, but passed implicitly?
}

export function PlayersTurns({ players, moves = 0 }: PlayersTurnsProps) {
  const totalPlayers = players.filter((name) => name.length);
  const [turn, setTurn] = useState(0);
  const lastTurn = totalPlayers.length - 1;

  useEffect(() => {
    if (moves % 2 != 0) return;
    setTurn(turn == lastTurn ? 0 : turn + 1);
  }, [moves]);

  return (
    <div className="absolute h-0 w-full top-0 left-0 flex justify-center">
      <div className="w-[80px] h-[60px] bg-[#222222] px-2 py-1 rounded-b-[10px] text-center">
        <h4 className="text-[#f3efe0]">{players[turn]}</h4>
      </div>
    </div>
  );
}
