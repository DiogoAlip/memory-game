import { convertToMinutes } from "../helpers/checkWinner"

export function BarGameMode({timeRange, movesRange}) {
    
    const Time = convertToMinutes(timeRange)
    const Moves = movesRange*5+15

    return(
        <div className="game_bar-container">
            <div className="game_bar">
                {timeRange > 0 && <h4>Time: {Time}</h4>}
                {movesRange > 0 && <h4>Moves: {Moves}</h4> }
                <button>Reanudar</button>
            </div>
        </div>
    )
}