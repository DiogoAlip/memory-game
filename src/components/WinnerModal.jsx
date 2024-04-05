export function WinnerModal({ winner = null, moves, resetGame }) {
  const text = !winner ? "" : winner + ", ";

  return (
    <div className="modal">
      <div className="text-container">
        <div className="text">
          <h1>{text}Felicidades!!!</h1>
          <hr />
          <h3>Moves: {moves}</h3>
          <div className="reset-button">
            <button onClick={resetGame}>Jugar Otra Ves</button>
          </div>
        </div>
      </div>
    </div>
  );
}
