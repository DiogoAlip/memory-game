export function Card({face, onClick, status}) { 

    return (
        <div className={(status != 1) ? "card-select" : "card"} onClick = {onClick}>
            { status > 1 && <img src={face} alt={face} /> }
        </div>
    )
}