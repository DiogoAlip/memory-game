export const checkWinner = (cardsArray: number[], value: number): boolean => {
  return cardsArray.every((element) => element == value);
};
