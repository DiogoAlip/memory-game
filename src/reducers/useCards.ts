import { useReducer } from "react";
import { cardsReducer } from "./cardsReducer";

export const useCards = (initialDeck) => {
    const [deck, dispatch] = useReducer(cardsReducer, initialDeck);
    const changeOneCard = (index: number, value: number) => {
        dispatch({ type: "CHANGE ONE CARD", index, value });
    };
    const changePairCard = (indexA: number, indexB: number, value: number) => {
        dispatch({ type: "CHANGE PAIR CARD", indexA, indexB, value });
    };
    const reset = () => {
        dispatch({ type: "RESET" });
    };
    return { deck, changeOneCard, changePairCard, reset };
}