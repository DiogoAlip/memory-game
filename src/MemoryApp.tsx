import { useContext, useEffect, useCallback } from "react";
import { Card } from "./components/Card";
import { FLIP_UP, BLOCK } from "./constants";
import { WinnerModal } from "./components/WinnerModal";
import { GameMode } from "./components/GameMode";
import { WinnerContext, WinnerContextType } from "./context/WinnerContext";
import { ClicksContext, ClicksContextType } from "./context/ClicksContext";
import { ConfigContext, ConfigContextType } from "./context/ConfigContext";
import { cardStore } from "./store/cards/card.store";
import { compareTwoCards, flipDownAllCardsAndShuffle, setCardStatus } from "./store/cards/card.thunks";
import { userStore } from "./store/players/players.store";
import { setWinnerByName } from "./store/players/players.thunks";

function MemoryApp() {
  const { winner, setWinner } = useContext(WinnerContext) as WinnerContextType;
  const { clicks, setClicks } = useContext(ClicksContext) as ClicksContextType;
  const { configBoolean, setConfigBoolean } = useContext(ConfigContext) as ConfigContextType;
  const cards = cardStore(state => state.cards)
  const players = userStore(state => state.players)

  useEffect(() => {
    if (cards.every((card) => card.status == BLOCK)) {
      setWinner(true);
      const cardsFromPlayer1 = cards.filter((card) => card.accertedBy === players.find((player) => player.turn)?.name)
      const cardsFromPlayer2 = cards.filter((card) => card.accertedBy === players.find((player) => !player.turn)?.name)
      if (cardsFromPlayer2.length == cardsFromPlayer1.length) return;
      const playerWinner = cardsFromPlayer1.length > cardsFromPlayer2.length ? players.find((player) => player.turn)?.name : players.find((player) => !player.turn)?.name
      setWinnerByName(playerWinner ?? "")
    }
  }, [cards])

  useEffect(() => {
    const flipedUpCardsIndex = cards.flatMap((card, index) => 
      card.status === FLIP_UP ? [index] : []
    );
  
    if (flipedUpCardsIndex.length === 2) {    
      const firstFlippedIndex = flipedUpCardsIndex[0]
      const secondFlippedIndex = flipedUpCardsIndex[1]
      compareTwoCards(firstFlippedIndex, secondFlippedIndex)
    }
  }, [cards])

  const restart = useCallback(({ clicksRestart = true } = {}) => {
    flipDownAllCardsAndShuffle()
    setWinner(null);
    if (clicksRestart) setClicks(0);
  }, []);

  const handleConfigClick = useCallback(() => {
    setConfigBoolean(prev => !prev);
  }, [])

  const handleCardClick = useCallback((index: number) => {
    setCardStatus(index, FLIP_UP);
    setClicks(prev => prev + 1)
  }, [])

  return (
    <>
      <div className="w-full flex justify-between items-center sm:flex-row flex-col gap-3">
        <h2 className="mx-3 text-center text-[#222222] font-bold text-2xl">Memory Game</h2>
        <div>
          {!configBoolean &&
            <button
              className="rounded-lg border border-[#222222] px-2 py-2.5 text-base font-medium bg-[#222222] text-[#f3efe0] cursor-pointer transition duration-200 mx-3 pointer-events-auto hover:bg-[#f3efe0] hover:text-[#22a39f] hover:border-[#22a39f]"
              onClick={() => restart()}
            >
              Restart Game
            </button>}
            <GameMode
              restart={restart}
              activeConfiguration={handleConfigClick}
            />
        </div>
      </div>
      <div
        className={`flex flex-wrap w-full justify-center mt-5 z-10 ${
          cards.filter((card) => card.status === FLIP_UP).length === 2
            ? "pointer-events-none"
            : ""
        }`}
      >
        {cards.map((card, index) => (
          <Card
            face={cards[index].image}
            key={`${index}${card}`}
            onClick={handleCardClick}
            status={cards[index].status}
            index={index}
          />
        ))}
      </div>
      {winner && !configBoolean && (
        <WinnerModal moves={Math.floor(clicks / 2)} resetGame={() => restart()} />
      )}
    </>
  );
}

export default MemoryApp;
