import { userStore } from "../store/players/players.store";
import { cardStore } from "../store/cards/card.store";

interface WinnerModalProps {
  moves: number;
  time?: number;
  resetGame: () => void;
}

export const WinnerModal = ({ time, moves, resetGame }: WinnerModalProps) => {
  const players = userStore.getState().players;
  const cards = cardStore.getState().cards;
  const playerWinner = players.find((player) => player.status === "winner")?.name;

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-[#22222280] flex justify-center items-center z-30">
      <div className="py-6 fixed w-[40%] min-w-[400px] h-auto bg-[#434343] flex justify-center items-center rounded-[30px]">
        <div className="w-[370px] h-auto flex flex-col gap-3 mx-auto">
        {
        players.filter((player) => player.name.length).length >= 2 ?
        <>
          <h1 className="text-[#f3efe0] text-center">{playerWinner ? `${playerWinner}, Felicidades!!!` : "Empate!!!"}</h1>
          <hr className="w-[80%] h-[2px] bg-[#f3efe0] mx-auto"/>
          <div className="flex flex-row w-[80%] gap-6 text-[#f3efe0] justify-between mx-auto text-center">
            {players.map((player) => 
            (<div key={player.name} className="flex flex-col">
              <h3>{player.name}</h3>
              <h3>Moves: {player.moves}</h3>
              <hr className="my-2"/>
              <h1>Cards</h1>
              <div className="w-full max-h-[100px] flex flex-wrap gap-2">
              {cards.map((card, index) => 
                (card.accurateBy == player.name && 
                <div key={`${card.image}${index}`} >
                  <img className="w-[20px] h-[20px] invert-[100%]" src={card.image} alt="" />
                </div>)
              )}
              </div>
            </div>)
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="rounded-lg border border-[#222222] px-2 py-2.5 text-base font-medium bg-[#222222] text-[#f3efe0] cursor-pointer transition duration-200 mx-3 pointer-events-auto hover:bg-[#f3efe0] hover:text-[#22a39f] hover:border-[#22a39f]"
              onClick={resetGame}
            >
              Jugar Otra Ves
            </button>
          </div>
        </>
        :
        <>
          <h1 className="text-[#f3efe0] text-center">Felicidades!!!</h1>
          <hr />
          <h3 className="text-[#f3efe0] text-center">Moves: {moves}</h3>
          {time && <h3 className="text-[#f3efe0] text-center">Time: {time}</h3>}
          <div className="flex justify-center">
            <button className="rounded-lg border border-[#222222] px-2 py-2.5 text-base font-medium bg-[#222222] text-[#f3efe0] cursor-pointer transition duration-200 mx-3 pointer-events-auto hover:bg-[#f3efe0] hover:text-[#22a39f] hover:border-[#22a39f]" onClick={resetGame}>Jugar Otra Ves</button>
          </div>
        </>
        }
        </div>
      </div>
    </div>
  );
}