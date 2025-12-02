import crow from '../assets/crow-solid.svg'
import dog from '../assets/dog-solid.svg'
import dove from '../assets/dove-solid.svg'
import frog from '../assets/frog-solid.svg'
import horse from '../assets/horse-solid.svg'
import kiwi_bird from '../assets/kiwi-bird-solid.svg'
import locust from '../assets/locust-solid.svg'
import worm from '../assets/worm-solid.svg'
import otter from '../assets/otter-solid.svg'
import hippo from '../assets/hippo-solid.svg'

export const randomArray = (): string[] => {
    const oldArray = [crow, dog, dove, frog, horse, kiwi_bird, locust, worm, otter, hippo]
    let oldDoubleArray = oldArray.concat(oldArray)
    let newArray = []
    for(let i = oldDoubleArray.length; i > 0; i--){
        const number = Math.floor(Math.random()*oldDoubleArray.length)
        newArray.push(oldDoubleArray[number])
        oldDoubleArray.splice(number,1)
    }
    return [...newArray]    
}