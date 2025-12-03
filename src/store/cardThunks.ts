import { cardStore } from "./card.store";
import { randomCardSimbols } from "../helpers/randomCardSimbols";
import { BLOCK, FLIP_DOWN } from "../constants";

export const flipDownAllCardsAndShuffle = () => {
    const cardsImage = randomCardSimbols();
    const setCards = cardStore.getState().setCards
    const cards = cardStore.getState().cards
    const shuffledCards = cards.map((card, index) => ({
        ...card,
        image: cardsImage[index],
        status: FLIP_DOWN,
        disabled: false
    }))
    setCards(shuffledCards)
}

export const compareTwoCards = (indexA: number, indexB: number) => {
    const setCardStatus = cardStore.getState().setCardStatus
    const setCards = cardStore.getState().setCards
    const cards = cardStore.getState().cards
    if (cards[indexA].image === cards[indexB].image) {
        disableAllCards(true)
        setCardStatus(indexA, BLOCK)
        setCardStatus(indexB, BLOCK)
        setCards(cards.map((card) => ({
            ...card,
            disabled: true
        })))
    } else {
        setCardStatus(indexA, FLIP_DOWN)
        setCardStatus(indexB, FLIP_DOWN)
    }
}

export const disableAllCards = (clickable: boolean) => {
    const cards = cardStore.getState().cards
    const setCards = cardStore.getState().setCards
    const disabledCards = cards.map(card => ({
        ...card,
        disabled: card.status == BLOCK ? true : clickable
    }))
    setCards(disabledCards)
}
    