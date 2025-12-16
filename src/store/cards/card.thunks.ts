import { cardStore } from "./card.store";
import { userStore } from "../players/players.store";
import {setPlayerTurnByName} from "../players/players.thunks"
import { randomCardSimbols } from "../../helpers/randomCardSimbols";
import { BLOCK, FLIP_DOWN } from "../../constants";

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
    const setCards = cardStore.getState().setCards
    const cards = cardStore.getState().cards
    const playerMove = userStore.getState().players.find((player) => player.turn )
    const nextPlayer = userStore.getState().players.find((player) => !player.turn )
    if (nextPlayer?.name) setPlayerTurnByName(nextPlayer?.name)
    if (cards[indexA].image === cards[indexB].image) {
        const playerAccurateName = playerMove?.name ?? ""
        setCards(cards.map((card, index) => ({
            ...card,
            disabled: true,
            status: index == indexA || index == indexB ? BLOCK : card.status,
            accurateBy: index == indexA || index == indexB ? playerAccurateName : card.accurateBy
        })))
    } else {
//        setTimeout(() => {
            setCards(cards.map((card, index) => ({
                ...card,
                disabled: false,
                status: index == indexA || index == indexB ? FLIP_DOWN : card.status
            })))
//        }, 700)
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

export const setCardStatus = (index: number, status: number) => {
    const setCards = cardStore.getState().setCards
    const cards = cardStore.getState().cards
    const updatedCards = cards.map((card, i) => (i === index ? { ...card, status } : card))
    setCards(updatedCards)
}