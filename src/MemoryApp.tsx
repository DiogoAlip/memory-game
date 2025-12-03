import { useContext, useEffect } from "react";
import { Card } from "./components/Card";
import { FLIP_DOWN, FLIP_UP, BLOCK } from "./constants";
import { WinnerModal } from "./components/WinnerModal";
//import { GameMode } from "./components/GameMode";
import { WinnerContext, WinnerContextType } from "./context/WinnerContext";
import { ClicksContext, ClicksContextType } from "./context/ClicksContext";
import { ConfigContext, ConfigContextType } from "./context/ConfigContext";
import { cardStore } from "./store/card.store";
import { flipDownAllCardsAndShuffle } from "./store/cardThunks";


function MemoryApp() {
  const { winner, setWinner } = useContext(WinnerContext) as WinnerContextType;
  const { clicks, setClicks } = useContext(ClicksContext) as ClicksContextType;
  const { configBoolean, setConfigBoolean } = useContext(ConfigContext) as ConfigContextType;
  const cards = cardStore(state => state.cards)
  const setCardStatus = cardStore(state => state.setCardStatus)

  useEffect(() => {
    if (cards.every((card) => card.status == BLOCK)) {
      setWinner(true);
    }
  }, [cards])

  const cardsStatusPairChanger = (firstCard: number, secondCard: number, value: number) => {
    setCardStatus(firstCard, value)
    setCardStatus(secondCard, value)
    const comprober = cards.every((card) => card.status == BLOCK);
    setWinner(comprober);
  };

  const checkAssert = (index: number) => {
    if (cards[index].status == BLOCK) return;
    setClicks(clicks + 1);

    const firstFlippedIndex = cards.findIndex((card) => card.status === FLIP_UP);

    if (firstFlippedIndex === -1) {
      setCardStatus(index, FLIP_UP);
    } else {
      if (firstFlippedIndex === index) {
        setCardStatus(index, FLIP_DOWN);
      } else {
        setCardStatus(index, FLIP_UP);
        const first = firstFlippedIndex;
        const second = index;
        if (cards[second].image == cards[first].image) {
          cardsStatusPairChanger(second, first, BLOCK);
        } else {
          setTimeout(() => {
            cardsStatusPairChanger(second, first, FLIP_DOWN);
          }, 700);
        }
      }
    }
  };

  const restart = ({ clicksRestart = true } = {}) => {
    flipDownAllCardsAndShuffle()
    setWinner(null);
    if (clicksRestart) setClicks(0);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center sm:flex-row flex-col gap-3">
        <h2 className="mx-3 text-center text-[#222222] font-bold text-2xl">Memory Game</h2>
        <div>
          {!configBoolean &&
            <button className="rounded-lg border border-[#222222] px-2 py-2.5 text-base font-medium bg-[#222222] text-[#f3efe0] cursor-pointer transition duration-200 mx-3 pointer-events-auto hover:bg-[#f3efe0] hover:text-[#22a39f] hover:border-[#22a39f]"
            onClick={() => restart()}
            >
              Restart Game
            </button>}
            {/* <GameMode
              restart={restart}
              activeConfiguration={(boolean: boolean) => setConfigBoolean(boolean)}
            /> */}
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
            onClick={() => checkAssert(index)}
            status={cards[index].status}
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
