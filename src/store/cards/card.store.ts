import {create} from "zustand";
import { randomCardSimbols } from "../../helpers/randomCardSimbols";
import { FLIP_DOWN } from "../../constants";

const initCardImages = randomCardSimbols().map((image) => ({
    image,
    status: FLIP_DOWN,
    accertedBy: "",
}))

export interface CardStoreInterface {
    cards: typeof initCardImages,
    setCards: (cards: typeof initCardImages) => void,
}

export const cardStore = create<CardStoreInterface>((set) => ({
    cards: initCardImages,
    setCards: (cards: typeof initCardImages) => set({ cards }),
}))