import { useContext, useState } from "react";
import { Card } from "./components/card";
import { randomArray } from "./helpers/arraysImages";
import { FLIP_DOWN, FLIP_UP, BLOCK } from "./constants";
import { WinnerModal } from "./components/WinnerModal";
import { GameMode } from "./components/GameMode";
import { WinnerContext, WinnerContextType } from "./context/WinnerContext";
import { ClicksContext, ClicksContextType } from "./context/ClicksContext";
import { ConfigContext, ConfigContextType } from "./context/ConfigContext";

function MemoryApp() {
  const { winner, setWinner } = useContext(WinnerContext) as WinnerContextType;
  const { clicks, setClicks } = useContext(ClicksContext) as ClicksContextType;
  const { configBoolean, setConfigBoolean } = useContext(ConfigContext) as ConfigContextType;
  const [cards, setCards] = useState<string[]>(randomArray());
  const [cardsStatus, setCardsStatus] = useState<number[]>(
    Array(cards.length).fill(FLIP_DOWN)
  );

  /* const cardsObject = randomArray().map((card, cardIndex) => 
  ({
    card,
    status: FLIP_DOWN,
    disable: true
  })) */
  //useContext para los clicks

  const cardsStatusPairChanger = (indexA: number, indexB: number, value: number) => {
    const newCardsStatus = cardsStatus.map((element, indexElement) =>
      (indexA === indexElement || indexB === indexElement) &&
      element != BLOCK &&
      element != value
        ? value
        : element
    );
    setCardsStatus(newCardsStatus);
    checkWinner(newCardsStatus);
  };

  const checkWinner = (cardsActually: number[]) => {
    const comprober = cardsActually.every((element) => element == BLOCK);
    setWinner(comprober);
  };

  const cardStatusChanger = (index: number, value: number) => {
    const newCardsStatus = cardsStatus.map((element, indexElement) =>
      index == indexElement && element != value ? value : element
    );
    setCardsStatus(newCardsStatus);
  };

  const checkAssert = (index: number) => {
    if (cardsStatus[index] == BLOCK) return;
    setClicks(clicks + 1);
    cardStatusChanger(
      index,
      cardsStatus[index] == FLIP_DOWN ? FLIP_UP : FLIP_DOWN
    );
    if ((clicks + 1) % 2 == 0 && clicks > 0) {
      const first = cardsStatus.findIndex((element) => element == FLIP_UP);
      const second = index;
      //const moves = clicks == 0? 0 : parseInt(clicks/2)
      if (second != first && cards[second] == cards[first]) {
        cardsStatusPairChanger(second, first, BLOCK);
      } else if (second != first) {
        const timeoutId = setTimeout(
          () => {
            cardsStatusPairChanger(second, first, FLIP_DOWN);
          },
          700,
          first,
          second
        );
      }
    }
  };

  const restart = ({ clicksRestart = true } = {}) => {
    if (clicksRestart) setClicks(0);
    setCardsStatus(Array(cards.length).fill(FLIP_DOWN));
    setCards(randomArray());
    setWinner(null);
  };

  return (
    <>
      <div className="top-bar">
        <h2>Memory Game</h2>
        <div>
          {!configBoolean && <button onClick={() => restart()}>Restart Game</button>}
          <GameMode
            restart={restart}
            activeConfiguration={(boolean: boolean) => setConfigBoolean(boolean)}
          />
        </div>
      </div>
      <div
        className={`card-container ${
          cardsStatus.filter((card) => card === FLIP_UP).length === 2
            ? "disabled"
            : ""
        }`}
      >
        {cards.map((card, index) => (
          <Card
            face={card}
            key={`${index}${card}`}
            onClick={() => checkAssert(index)}
            status={cardsStatus[index]}
          />
        ))}
      </div>
      {winner && !configBoolean && (
        <WinnerModal moves={Math.floor(clicks / 2)} resetGame={restart} />
      )}
    </>
  );
}

export default MemoryApp;
