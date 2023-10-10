import { useState } from "react"
import { Card } from "./components/card"
import { randomArray } from "./helpers/arraysImages"
import { FLIP_DOWN, FLIP_UP, BLOCK } from "./constants"

function MemoryApp() {
  const [cards, setCards] = useState(randomArray())
  const [cardsStatus, setCardsStatus] = useState(Array(cards.length).fill(FLIP_DOWN))
  const [clicks,setClicks] = useState(0)

  const cardsStatusPairChanger = (indexA, indexB, value) => {
    const newCardsStatus = cardsStatus.map((element,indexElement) => (indexA == indexElement || indexB == indexElement) && element != BLOCK && element != value? value : element)
    setCardsStatus(newCardsStatus)
  }

  const cardStatusChanger = (index,value) => {
    const newCardsStatus = cardsStatus.map((element,indexElement) => index == indexElement && element != value ? value : element)
    setCardsStatus(newCardsStatus)
  }

  const checkAssert = (index) => {
    if (cardsStatus[index] == BLOCK) return
    setClicks(clicks+FLIP_DOWN)
    cardStatusChanger(index, cardsStatus[index] == FLIP_DOWN ? FLIP_UP : FLIP_DOWN)
    if((clicks +FLIP_DOWN)%FLIP_UP == 0 && clicks > 0){
      const first = cardsStatus.findIndex((element) => element == FLIP_UP)
      const second = index
      //const moves = clicks == 0? 0 : parseInt(clicks/FLIP_UP)
      if(second != first && cards[second] == cards[first]){
        cardsStatusPairChanger(second,first,BLOCK)
      }else if(second != first){
        setTimeout(() => {
          cardsStatusPairChanger(second,first,FLIP_DOWN)
        }, 700)
      }
    }
  }

  const restart = () => {
    setClicks(0)
    setCardsStatus(Array(cards.length).fill(FLIP_DOWN))
    setCards(randomArray)
  }

  return (
    <>
    <div className='top-bar'>
      <h2>Memory Game</h2> 
      <button onClick={restart}>Restart Game</button> 
    </div>
    <div className="card-container">
    {cards.map((card,index) => (  
        <Card 
          face={card}
          key={`${index}${card}`}
          onClick={() => checkAssert(index)}
          //moves={clicks}
          status={cardsStatus[index]}
        />
      ))}
    </div>
    </>
  ) 
}

export default MemoryApp
