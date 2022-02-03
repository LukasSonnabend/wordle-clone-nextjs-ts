import React, { FunctionComponent, useState } from "react"; // we need this to make JSX compile
import { CharBoxRow } from "./CharBoxRow";
import { KeyBoard } from "./KeyBoard";
import { guessCheck, GuessResponse } from "../types";
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
  const [checkArray, setCheckArray] = useState<guessCheck[]>(
    Array(initialGuess).fill({ letterStatus: [] })
  );
  const [roundWon, setRoundWon] = useState<Boolean>(false);
  const totalGuesses = initialGuess;

  const postGuess = async (guess: String) => {
    try {
      const response = await fetch("/api/v1/game/guess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guess: guess,
          wordID: 0,
        }),
      });

      const guessEvaluation = await response.json();
      return guessEvaluation;
    } catch (error) {
      console.error(error);
    }
  };

  const enterFunction = async () => {
    if (guessString.length < initialGuess) {
      alert("Bitte 5 Buchstaben eingeben");
      return;
    }

    const apiResponse: GuessResponse = await postGuess(guessString);
    console.log(apiResponse);
    if (!apiResponse.validGuess) {
      alert("Dieses Wort existiert nicht");
      return;
    }

    //save guess to guessArray
    setGuessesArray(
      guessesArray.map((guess, index) => {
        if (index === totalGuesses - currentGuess) {
          return guessString;
        } else {
          return guess;
        }
      })
    );

    setCheckArray(
      checkArray.map((letterStatusObject, index) => {
        if (index === totalGuesses - currentGuess) {
          return { letterStatus: apiResponse.evaluation.letterStatus };
        } else {
          return letterStatusObject;
        }
      })
    );

    // hier könnte man direkt ein objekt bauen und dieses an das keyboard objekt schicken
    setRoundWon(apiResponse.wordGuessed);
    // reset guess
    setGuessString("");
    setCurrentGuess(currentGuess - 1);
  };

  // hier post auf api irgendwie muss das zu eratende wort gematcht werden
  const handleClick = async (char: String) => {
    if (char === "DELET") {
      setGuessString(guessString.slice(0, -1));
    } else if (char === "ENTER") {
      await enterFunction();
    } else if (guessString.length < 5) setGuessString(`${guessString}${char}`);
  };

  return (
    <>
      <div className="h-4/6">
        {roundWon && "Gewonnen!"}
        {[...Array(totalGuesses + 1)].map((_, i) => {
          return (
            <CharBoxRow
              key={i}
              guessedRow={i < totalGuesses - currentGuess}
              guess={
                i == totalGuesses - currentGuess ? guessString : guessesArray[i]
              }
              checkArr={checkArray[i] && checkArray[i]}
              boxCount={totalGuesses}
            />
          );
        })}
      </div>
      <div className="fixed w-screen lg:flex md:w-3/6 bottom-0 h-2/6">
        <KeyBoard handleClick={handleClick} />
      </div>
    </>
  );
};
