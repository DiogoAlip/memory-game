export const checkWinner = (cardsArray, value) => {
    return cardsArray.every( element => element == value )
}

export const convertToMinutes = (time) => `${parseInt((time)/2)}:${(time+1)%2 == 0 ? "30" : "00"}`