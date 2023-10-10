import { useState } from "react"
import { Card } from "./components/card"
import { randomArray } from "./variables/arraysImages"

function MemoryApp() {
  const [cards, setCards] = useState(randomArray())
  const [clicks,setClicks] = useState(0)
  const [asserts, setAsserts] = useState([])

  const checkAssert = (index) => {
    setAsserts([...asserts,index])
    if(clicks%2 == 0 && clicks != 0){
      //moves = clicks == 0? 0 : parseInt(clicks/2)
      const [a,b] = asserts.slice(-2)
      console.log(a + "     " + b)
      if(a != b && cards[a] == cards[b]){
        console.log(asserts)
      }else{
        
      }
    }
    setClicks(clicks+1)
    console.log(clicks)
  }

  const restart = () => {
    setCards(randomArray)
    /*mas complementos */
  }

  return (
    <>
    <div className='top-bar'>
      <h2>Memory App</h2> 
      <button onClick={restart}>Restart Game</button> 
    </div>
    <div className="card-container">
    {cards.map((card,index) => (  
        <Card 
          face={card}
          key={`${index}${card}`}
          onClick={() => checkAssert(index)}
          //moves={clicks}
          flip={false}/>
      ))}
    </div>
    </>
  ) 
}

export default MemoryApp
