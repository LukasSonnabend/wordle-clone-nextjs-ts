export interface guessCheck{
  letterStatus: number[]
}

export type GuessResponse = {
  submittedGuess: string,
  validGuess: boolean,
  evaluation: guessCheck
  wordGuessed: boolean,
}