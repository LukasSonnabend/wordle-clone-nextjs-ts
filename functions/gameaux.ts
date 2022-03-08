import { ReceiptRefundIcon } from "@heroicons/react/outline"
import { guessCheck, round } from "../types"

export const persistRound = (guessArray: string[], checkArray: guessCheck[], currentGuess: number, keysObject: object) => {
// write to local storage
  const roundObject: round = {
    guesses: guessArray,
    checks: checkArray,
    currentGuess: currentGuess,
    keysObject: keysObject,
  }
  
  localStorage.setItem('round', JSON.stringify(roundObject))
}


export const loadRound = () => {
  const persistedRound = typeof window !== 'undefined' ? localStorage.getItem('round') : null
  if (persistedRound) {
    const round = JSON.parse(persistedRound)
    return round
  } else 
  
  return null
}
