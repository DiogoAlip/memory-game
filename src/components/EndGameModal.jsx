export const EndGameModal = ({ players, moves, time, resetGame }) => {
  const reasons = moves ? "No hay mas Movimientos!" : "Tiempo Culminado!";

  return (
    <div className="modal end-modal">
      <div className="text-container">
        <div className="text">
          <h1>Se acabo el juego</h1>
          <h2>{reasons}</h2>
          <hr />
          {<h3>Moves: {moves}</h3>}
          {time && <h3>Time: {time}</h3>}
          <div className="reset-button">
            <button onClick={resetGame}>Jugar Otra Ves</button>
          </div>
        </div>
      </div>
    </div>
  );
};
