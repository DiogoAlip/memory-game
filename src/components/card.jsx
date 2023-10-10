import { useState } from "react"

export function Card({face, onClick,flip}) {
    const [fliped, setFliped] = useState(flip)

    const onFlip = () => {
        onClick()
        setFliped(!fliped)
    }

    return (
        <div className={fliped ? "card-select" : "card"} onClick = {onFlip}>
            { fliped && <img src={face} alt={face} /> }
        </div>
    )
}