export interface guessCheck{
  letterStatus: number[]
}

export type GuessResponse = {
  submittedGuess: string,
  validGuess: boolean,
  evaluation: guessCheck
  wordGuessed: boolean,
}

export type round = {
  guesses: string[],
  checks: guessCheck[],
  currentGuess: number,
  keysObject: object,
}