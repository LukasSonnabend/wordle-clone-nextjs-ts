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
  console.log(wordToGuess)
  // first match letters in correct position
  let word2GuessArray: string[] = wordToGuess.split("")
  let guessStringArray: string[] = guessString.split("")
  let validationArray: number[] = Array(guessString.length).fill(1)

  for (let i = 0; i < guessStringArray.length; i++) {
    if (guessStringArray[i] === word2GuessArray[i]) {
      validationArray[i] = 3
      word2GuessArray[i] = " "
    }
  }

  // then match letters in wrong position correct letters sind spaces
  for (let i = 0; i < guessStringArray.length; i++) {
    if (guessStringArray[i] !== " " && word2GuessArray.includes(guessStringArray[i]) ){
      validationArray[i] = 2;
      word2GuessArray[word2GuessArray.indexOf(guessStringArray[i])] = " "
    }
  }

  return validationArray
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
