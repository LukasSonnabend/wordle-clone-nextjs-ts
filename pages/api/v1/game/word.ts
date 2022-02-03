// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { guessCheck, GuessResponse } from '../../../../types'

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    guess: string,
    wordID: number,
  };
}

const allWordsObject: Record<string, String[]> = require('../../../../util/wordJson.json'); 

const randomWord = (): number[] => {
  const alphabet = "abcdefghijklmnopqrstuvwxz"
  const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)]
  return [alphabet.indexOf(randomLetter), Math.floor(Math.random() * allWordsObject[randomLetter].length)]

}

export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<GuessResponse>
) {

  // get random word from wordList

  res.status(200).json({
    guessWord: randomWord()
  })
}
