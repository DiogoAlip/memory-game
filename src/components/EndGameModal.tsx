interface EndGameModalProps {
  players?: string[];
  moves: number;
  time: string | null;
  resetGame: () => void;
}

export const EndGameModal = ({ players, moves, time, resetGame }: EndGameModalProps) => {
  const reasons = moves ? "No hay mas Movimientos!" : "Tiempo Culminado!";

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-[#22222280] flex justify-center items-center z-20">
      <div className="fixed w-[40%] min-w-[400px] h-auto bg-[#434343] flex justify-center items-center rounded-[30px]">
        <div className="w-[370px] h-auto my-5 mx-auto">
          <h1 className="text-[#f3efe0] text-center">Se acabo el juego</h1>
          <h2 className="text-[#f3efe0] text-center">{reasons}</h2>
          <hr />
          {<h3 className="text-[#f3efe0] text-center">Moves: {moves}</h3>}
          {time && <h3 className="text-[#f3efe0] text-center">Time: {time}</h3>}
          <div className="flex justify-center">
            <button className="rounded-lg border border-[#222222] px-2 py-2.5 text-base font-medium bg-[#222222] text-[#f3efe0] cursor-pointer transition duration-200 mx-3 pointer-events-auto hover:bg-[#f3efe0] hover:text-[#22a39f] hover:border-[#22a39f]" onClick={resetGame}>Jugar Otra Ves</button>
          </div>
        </div>
      </div>
    </div>
  );
};
