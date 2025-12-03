import {create} from "zustand";
import { randomCardSimbols } from "../../helpers/randomCardSimbols";
import { FLIP_DOWN } from "../../constants";

const initCardImages = randomCardSimbols().map((image) => ({
    image,
    status: FLIP_DOWN,
    accertedBy: "",
    disabled: false
}))

export interface CardStoreInterface {
    cards: typeof initCardImages,
    setCards: (cards: typeof initCardImages) => void,
    setCardStatus: (index: number, status: number) => void,
    setAllCardsStatus: (status: number) => void,
    setCardAccertedBy: (index: number, accertedBy: string) => void,
}

export const cardStore = create<CardStoreInterface>((set) => ({
    cards: initCardImages,
    setCards: (cards: typeof initCardImages) => set({ cards }),
    setCardStatus: (index: number, status: number) => set((state) => ({
        cards: state.cards.map(
            (card: typeof initCardImages[number], i: number) => (i === index ? { ...card, status } : card)
        )
    })),
    setAllCardsStatus: (status: number) => set((state) => ({
        cards: state.cards.map(
            (card: typeof initCardImages[number]) => ({ ...card, status })
        )
    })),
    setCardAccertedBy: (index: number, accertedBy: string) => set((state) => ({
        cards: state.cards.map(
            (card, cardIndex) => (cardIndex === index ? { ...card, accertedBy } : card )
        )
    }))
}))