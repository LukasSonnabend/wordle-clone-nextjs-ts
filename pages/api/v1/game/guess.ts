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
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
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
    // only mark as 'present but wrong place' when not already correct
    if (validationArray[i] === 1 && word2GuessArray.includes(guessStringArray[i])) {
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
  const userGuess = (req.body && req.body.guess) ? String(req.body.guess).toLowerCase() : ""

  const wordID = req.body && req.body.wordID

  // basic payload validation
  if (!userGuess || !Array.isArray(wordID) || typeof wordID[0] !== 'number' || typeof wordID[1] !== 'number') {
    return res.status(400).json({
      submittedGuess: userGuess,
      validGuess: false,
      evaluation: { letterStatus: [] },
      wordGuessed: false,
    })
  }

  // verify the referenced word exists in our word list
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const letterKey = alphabet[wordID[0]]
  if (!letterKey || !allWordsObject[letterKey] || allWordsObject[letterKey][wordID[1]] === undefined) {
    return res.status(400).json({
      submittedGuess: userGuess,
      validGuess: false,
      evaluation: { letterStatus: [] },
      wordGuessed: false,
    })
  }

  let isRealWord = false
  try {
    isRealWord = allWordsObject[userGuess[0]]?.includes(userGuess) || false
  } catch (error) {
    isRealWord = false
  }

  const validationArray = validateGuess(userGuess, wordID)

  res.status(200).json({
    submittedGuess: userGuess,
    validGuess: isRealWord,
    evaluation: {letterStatus: (isRealWord ? validationArray : [])},
    wordGuessed: validationArray.reduce((a,b) => a+b) === userGuess.length * 3
  })
}
