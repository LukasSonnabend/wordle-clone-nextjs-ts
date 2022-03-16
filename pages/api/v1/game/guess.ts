// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { GuessResponse } from '../../../../types'

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    guess: string,
    wordID: number[],
  };
}

const allWordsObject: Record<string, String[]> = require('../../../../util/wordJson.json');


const validateGuess = (guessString: string, wordID: number[]): number[] => {
  const alphabet = "abcdefghijklmnopqrstuvwxz"
  const wordToGuess = allWordsObject[alphabet[wordID[0]]][wordID[1]]

  let word2GuessArray = wordToGuess.split("")
  let guessStringArray = guessString.split("")
  const counts = {};

  //TODO: disable counts for hard mode
  for (const char of word2GuessArray) {
    counts[char] = counts[char] ? counts[char] + 1 : 1;
  
  let validationArray = Array(guessString.length).fill(1)

   // first correct guesses
   for (let i = 0; i < guessString.length; i++) {
    if (guessString[i] === word2GuessArray[i]) {
      validationArray[i] = 3
      word2GuessArray[i] = " "
   }
   }

   console.log(guessStringArray)
   for (let i = 0; i < guessStringArray.length; i++) {
      // guessArrray          Word2Guess
      // namen          ->     pfand
      console.log(counts)
      if (guessStringArray[i] !== " " && word2GuessArray.includes(guessStringArray[i]) ){
        validationArray[i] = counts[guessStringArray[i]]-- > 0 ? 2 : 1;
        word2GuessArray[i] = " "
      }
   }

  return validationArray;
}

export default function handleGuess(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<GuessResponse>
) {
  const userGuess = req.body.guess.toLowerCase()

  let isRealWord
  try {
    isRealWord = allWordsObject[userGuess[0]].includes(userGuess)
  } catch (error) {
    isRealWord = false
  }


  const validationArray = validateGuess(userGuess, req.body.wordID)

  res.status(200).json({
    submittedGuess: userGuess,
    validGuess: isRealWord,
    evaluation: {letterStatus: (isRealWord ? validationArray : [])},
    wordGuessed: validationArray.reduce((a,b) => a+b) === userGuess.length * 3
  })
}
