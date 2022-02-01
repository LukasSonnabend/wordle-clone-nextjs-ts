import React, { FunctionComponent, useState } from "react"; // we need this to make JSX compile
import { CharBoxRow } from "./CharBoxRow";
import { KeyBoard } from "./KeyBoard";
import { guessCheck } from "../types";
import { addListener } from "process";

export const GameView: FunctionComponent<{
  initialString?: String;
  initialGuess?: Number;
}> = ({ initialString = "", initialGuess = 5 }) => {
  const [guessesArray, setGuessesArray] = useState<String[]>(
    Array(initialGuess).fill("")
  );
  const [guessString, setGuessString] = useState<String>(initialString);
  // inital guesses müssen von difficulty reingegeben werden
  const [currentGuess, setCurrentGuess] = useState<Number>(initialGuess);
  const totalGuesses = initialGuess;

  //testing
  const checkArr: guessCheck[] = [
    {letterStatus: [0, 1, 0, 2, 1]},
    {letterStatus: [0, 1, 0, 2, 1]},
  ];


  // hier post auf api irgendwie muss das zu eratende wort gematcht werden
  const handleClick = (char: String) => {
    if (char === "DELET") {
      setGuessString(guessString.slice(0, -1));
    } else if (char === "ENTER") {
      if (guessString.length < initialGuess) {
        alert("Bitte 5 Buchstaben eingeben")
        return
      }
      // replace index in array
      setGuessesArray(
        guessesArray.map((guess, index) => {
          if (index === totalGuesses - currentGuess) {
            return guessString;
          } else {
            return guess;
          }
        })
      );
      // reset guess
      setGuessString("");
      setCurrentGuess(currentGuess - 1);
    } else if (guessString.length < 5) setGuessString(`${guessString}${char}`);
  };

  return (
    <>
      <div>
        {[...Array(totalGuesses)].map((_, i) => {
          return (
            <CharBoxRow
              key={i}
              guessedRow={i < totalGuesses - currentGuess}
              guess={i == totalGuesses - currentGuess ? guessString : guessesArray[i]}
              checkArr={checkArr[i] && checkArr[i]}
              boxCount={totalGuesses}
            />
          );
        })}

        <div className="flex flex-wrap justify-center mt-4">
          <KeyBoard handleClick={handleClick} />
        </div>
      </div>
    </>
  );
};
