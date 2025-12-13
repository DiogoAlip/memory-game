import { userStore } from "../players/players.store";
import { status } from "../players/players.store";

export const setPlayersByName = (players: string[]) => {
    const setPlayers = userStore.getState().setPlayers
    const newPlayers = players.map((player, index) => ({
        name: player,
        moves: 0,
        time: "",
        status: "playing" as status,
        turn: index == 0,
        room: "",
        id: `${players[index]}${index}`,
        createdAt: ""
    })) 
    setPlayers(newPlayers)
}

export const setPlayerTurnByName = (playerName: string) => {
    const setPlayers = userStore.getState().setPlayers
    const players = userStore.getState().players
    const newPlayers = players.map((player) => ({
        ...player,
        turn: player.name == playerName,
        moves: player.name == playerName ? player.moves + 1 : player.moves
    }))
    setPlayers(newPlayers)
}

export const setWinnerByName = (playerName: string) => {
    const setPlayers = userStore.getState().setPlayers
    const players = userStore.getState().players
    const newPlayers = players.map((player) => ({
        ...player,
        status: (player.name == playerName ? "winner" : "loser") as status
    }))
    setPlayers(newPlayers)
}

export const setPlayerMovesByName = (playerName: string) => {
    const setPlayers = userStore.getState().setPlayers
    const players = userStore.getState().players
    const newPlayers = players.map((player) => ({
        ...player,
        moves: player.name == playerName ? player.moves + 1 : player.moves
    }))
    setPlayers(newPlayers)
}


export const setPlayerTimeByName = (playerName: string, playerTime: string) => {
    const setPlayers = userStore.getState().setPlayers
    const players = userStore.getState().players
    const newPlayers = players.map((player) => ({
        ...player,
        time: player.name == playerName ? playerTime : player.time
    }))
    setPlayers(newPlayers)
}

export const playersValidator = () => {
    const players = userStore.getState().players
    const totalPlayers = players.filter((player) => player.name.length >= 3);
    return totalPlayers.length >= 2;
}

export const quitAllPlayers = () => {
    const setPlayers = userStore.getState().setPlayers
    setPlayers([])
}