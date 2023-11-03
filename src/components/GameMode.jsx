import { useState } from "react"
import circle from "../assets/circle-xmark-regular.svg"
import right from "../assets/caret-right-solid.svg"
import left from "../assets/caret-left-solid.svg"
import { ConfigurationsButtons } from "./ConfigurationButtons.jsx"
import { BarGameMode } from "./BarGameMode"
import { convertToMinutes } from "../helpers/checkWinner"
import { PlayersTurns } from "./PlayersTurns"

export function GameMode({clicks}) {
    const [barState, setBarState] = useState(false)
    const [options, setOptions] = useState(0)
    const [timeRange,setTimeRange] = useState(0)
    const [movesRange,setMovesRange] = useState(0)
    const [players,setPlayers] = useState(Array(4).fill(""))

    const changeBarState = () => {setBarState(barState == true ? false : true)}

    const backOptionsView = () => {
        setOptions(options == 0? 2 : options-1)
    }

    const nextOptionsView = () => {
        setOptions(options == 2? 0 : options+1)
    }

    const onChangeRange = (event) => {
        setTimeRange(parseInt(event.target.value))
    }

    const backOptionsMoves = () => {
        setMovesRange(movesRange == 0? 5 : movesRange-1)
    }

    const nextOptionsMoves = () => {
        setMovesRange(movesRange == 5? 0 : movesRange+1)
    }

    const onSetPlayers = (eventPlayer,newPlayerIndex) => {
        const newPlayerName = eventPlayer.target.value
        const newPlayers = players.map((playerElement,indexPlayers) => indexPlayers == newPlayerIndex ? newPlayerName : playerElement)
        setPlayers(newPlayers)
    }

    const playersValidator = () => {
        const totalPlayers = players.filter( (name) => name != "" )
        if (new Set(totalPlayers).size < totalPlayers.length) return 0
        return totalPlayers.length < 2 ? 0 : 1
    }

    return (
        <>
        <button onClick={changeBarState}>Game Mode</button>
        {barState && 
        <div className="modal">
            <div className="text-container">
                <div className="text">
                    <button className="exit-button" onClick={changeBarState}>            
                        <img src={circle} alt={circle} />
                    </button>
                    <div className="modal-header">
                        <h2>Configuraciones del juego</h2>
                        <hr/>
                        <div className="game-mode_options-menu">
                            <button className="exit-button" onClick={backOptionsView}>
                                <img src={left} alt={left} />
                            </button>
                            {options == 0 &&
                            <div>
                                <h4>Tiempo de Juego</h4>
                                <input type="range" name ="game_time" min="0" max="6" value={timeRange} onChange={(event) => onChangeRange(event)}/>
                                <h4>{convertToMinutes(timeRange)}</h4>
                                <ConfigurationsButtons value={timeRange} onNextAplication={nextOptionsView} onCancel={() => {setTimeRange(0)}}/>
                            </div>
                            }
                            {options == 1 &&
                            <div>
                                <h4>Numero de movimientos</h4>
                                <div className="moves-setter">
                                    <button className="exit-button" onClick={backOptionsMoves}>
                                        <img src={left} alt={left} />
                                    </button>
                                    <h3>{ movesRange == 0 ? "None" : movesRange*5+15}</h3>
                                    <button className="exit-button" onClick={nextOptionsMoves}>
                                        <img src={right} alt={right} />
                                    </button>
                                </div>
                                <ConfigurationsButtons value={movesRange} onNextAplication={nextOptionsView} onCancel={() => {setMovesRange(0)}}/>
                            </div>
                            }
                            {options == 2 &&
                            <div>
                                <h4>Multijugador</h4>
                                <form className="players-name_container" name="players">
                                    {
                                        players.map((playerName,playerIndex) => (
                                            <input 
                                                placeholder={`player ${playerIndex+1}`}
                                                type="text"
                                                value={playerName}
                                                key={`${playerIndex}`}
                                                maxLength={20}
                                                onChange={(event) => onSetPlayers(event,playerIndex)}
                                            />
                                        ))
                                    }
                                </form>
                                <ConfigurationsButtons value={playersValidator()} onNextAplication={nextOptionsView} onCancel={() => {setPlayers(Array(4).fill(""))}}/>
                            </div>
                            }
                            <button className="exit-button" onClick={nextOptionsView}>
                                <img src={right} alt={right} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>}

        { ( (movesRange > 0 || timeRange > 0 ) && !(barState) ) && 
            <BarGameMode timeRange={timeRange} movesRange={movesRange}/>
        }

        { ( playersValidator() > 0 && !(barState) ) &&
            <PlayersTurns players={players} moves={clicks%2}/>
        }
        </>
    )
}