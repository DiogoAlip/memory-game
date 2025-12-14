import { userStore } from "../store/players/players.store";

export function PlayersTurns() {
  const playerTurn = userStore((state) => 
    state.players.find((player) => player.turn)
  );

  return (
    <div className="absolute w-full h-0 top-0 left-0 flex justify-center">
      <div className="w-fit max-w-[100px] h-fit bg-[#222222] px-3 py-5 rounded-b-[10px] text-center">
        <h4 className="text-[#f3efe0]">{playerTurn?.name}</h4>
      </div>
    </div>
  );
}
