import { create } from "zustand";

export type status = "winner" | "loser" | "playing";

export type player = {
    name: string;
    moves: number;
    time: string;
    status: status;
    turn: boolean;
    room: string;
    id: string;
    createdAt: string;
}

export interface userStoreInterface {
    players: player[];
    setPlayers: (newPlayers: player[]) => void;
}

export const userStore = create<userStoreInterface>((set) => ({
    players: [],
    setPlayers: (newPlayers: player[]) => set({ players: newPlayers })
}))