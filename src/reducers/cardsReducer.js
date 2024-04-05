import { BLOCK, FLIP_DOWN, FLIP_UP } from "../constants";
export const cardsReducer = (initialDeck, action) => {
  switch (action.type) {
    case "CHANGE ONE CARD":
      return initialDeck.map((element, indexElement) =>
        action.index == indexElement && element.status != action.value
          ? { ...element, status: action.value }
          : element
      );
    case "CHANGE PAIR CARD":
      return initialDeck.map((element, indexElement) =>
        (action.indexA === indexElement || action.indexB === indexElement) &&
        element.status != BLOCK &&
        element.card != action.value
          ? { ...element, status: action.value }
          : element
      );
    /* case "RESET": return initialDeck.map((_, indexElement) => ({
      card, status
    })); */
    default:
      return initialDeck;
  }
};
