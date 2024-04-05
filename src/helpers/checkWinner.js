export const checkWinner = (cardsArray, value) => {
  return cardsArray.every((element) => element == value);
};
