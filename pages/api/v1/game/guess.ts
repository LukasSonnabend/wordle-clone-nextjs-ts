// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { guessCheck, GuessResponse } from '../../../../types'

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    guess: string,
    wordID: number[],
  };
}

const allWordsObject: Record<string, String[]> = require('../../../../util/wordJson.json'); 


const validateGuess = (guessString: String, wordID: number[]): number[] => {
  const alphabet = "abcdefghijklmnopqrstuvwxz"
  const wordToGuess = allWordsObject[alphabet[wordID[0]]][wordID[1]]

  let word2GuessArray = wordToGuess.split("")

  const counts = {};

  //TODO: disable counts for hard mode
  for (const char of word2GuessArray) {
    counts[char] = counts[char] ? counts[char] + 1 : 1;
  }

  
  console.log(wordToGuess)
  console.log(counts)
  return guessString.split('').map((char, index) => {
    if (char === word2GuessArray[index]) {
      word2GuessArray[index] = " " // falls richtig geraten wird nicht falsche position danach angezeigt
      counts[char]--;
      return 3;
    } else if (word2GuessArray.includes(char)) {
      return counts[char]-- > 0 ? 2 : 1;
    } else {
      return 1;
    }
  })
}

export default function handler(
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
