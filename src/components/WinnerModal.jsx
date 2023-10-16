
export function WinnerModal({winner = null, moves}) {

    const text = winner == null? "" : winner + ", "

    return (
    <div className="winner">
        <div className="text-container">
            <div className="text">
                <h1>{text}Felicidades!!!</h1>
                <hr/>
                <h3>Moves: {moves}</h3>
            </div>
        </div>
    </div>
    )
}