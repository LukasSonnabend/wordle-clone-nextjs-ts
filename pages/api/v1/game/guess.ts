// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { guessCheck } from '../../../../types'

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    guess: string,
    wordID: number,
  };
}

const allWordsObject: Record<string, String[]> = { a: ["abtei", "abgas"] }
const wordList = ["abtei"]


const validateGuess = (guessString: String, wordID: number): number[] => {
  const wordToGuess = wordList[wordID].split("")
  return guessString.split('').map((char, index) => {
    if (char === wordToGuess[index]) {
      wordToGuess[index] = " " // falls richtig geraten wird nicht falsche position danach angezeigt
      return 2;
    } else if (wordToGuess.includes(char)) {
      return 1
    } else {
      return 0;
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
    wordGuessed: validationArray.reduce((a,b) => a+b) === userGuess.length * 2
  })
}
