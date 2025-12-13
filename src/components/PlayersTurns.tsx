import { useState, useEffect, useContext } from "react";
import { ClicksContext } from "../context/ClicksContext";
import { userStore } from "../store/players/players.store";

export function PlayersTurns() {
  const [turn, setTurn] = useState(0);
  const {clicks} = useContext(ClicksContext);
  const players = userStore.getState().players;
  const totalPlayers = players.filter((player) => player.name.length);
  const lastTurn = totalPlayers.length - 1;

  useEffect(() => {
    if ( clicks % 2 != 0) return;
    setTurn(turn == lastTurn ? 0 : turn + 1);
  }, [clicks]);

  return (
    <div className="absolute w-full h-0 top-0 left-0 flex justify-center">
      <div className="w-fit max-w-[100px] h-fit bg-[#222222] px-3 py-5 rounded-b-[10px] text-center">
        <h4 className="text-[#f3efe0]">{players[turn].name}</h4>
      </div>
    </div>
  );
}
