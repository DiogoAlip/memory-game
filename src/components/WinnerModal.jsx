
export function WinnerModal({winner = null, moves, resetGame}) {

    const text = winner == null? "" : winner + ", "

    return (
    <div className="modal">
        <div className="text-container">
            <div className="text">
                <h1>{text}Felicidades!!!</h1>
                <hr/>
                <h3>Moves: {moves}</h3>
                <button onClick={resetGame}>Restart</button>
            </div>
        </div>
    </div>
    )
}