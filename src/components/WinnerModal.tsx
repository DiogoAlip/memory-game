interface WinnerModalProps {
  winner?: boolean | null | string;
  moves: number;
  resetGame: () => void;
}

export function WinnerModal({ winner = null, moves, resetGame }: WinnerModalProps) {
  const text = !winner ? "" : winner + ", ";

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-[#22222280] flex justify-center items-center z-30">
      <div className="py-6 fixed w-[40%] min-w-[400px] h-auto bg-[#434343] flex justify-center items-center rounded-[30px]">
        <div className="w-[370px] h-auto flex flex-col gap-3 mx-auto">
          <h1 className="text-[#f3efe0] text-center">{text}Felicidades!!!</h1>
          <hr />
          <h3 className="text-[#f3efe0] text-center">Moves: {moves}</h3>
          <div className="flex justify-center">
            <button className="rounded-lg border border-[#222222] px-2 py-2.5 text-base font-medium bg-[#222222] text-[#f3efe0] cursor-pointer transition duration-200 mx-3 pointer-events-auto hover:bg-[#f3efe0] hover:text-[#22a39f] hover:border-[#22a39f]" onClick={resetGame}>Jugar Otra Ves</button>
          </div>
        </div>
      </div>
    </div>
  );
}
