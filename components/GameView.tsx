import React, { FunctionComponent, useState } from "react"; // we need this to make JSX compile
import { CharBoxRow } from "./CharBoxRow";
import { Profile } from "./Profile";
import { KeyBoard } from "./KeyBoard";
import { guessCheck, GuessResponse } from "../types";
import confetti from "canvas-confetti";

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

  const [serverGuessInfo, setServerGuessInfo] = useState<number[]>([]);
  const [keysObject, setKeysObject] = useState<object>({});

  const [roundWon, setRoundWon] = useState<Boolean>(false);
  const totalGuesses = initialGuess;

  const resetRound = () => {
    setGuessString("");
    setGuessesArray(Array(totalGuesses).fill(""));
    setCurrentGuess(totalGuesses);
    setCheckArray(Array(totalGuesses).fill({ letterStatus: [] }));
    setRoundWon(false);
    setKeysObject({});
  };

  const keyStatusFunc = (guesses: String[], check: guessCheck[]) => {
    const temp = {};
    let currentGuess = initialGuess - totalGuesses;
    for (var i = 0; i < guesses[currentGuess].length; i++) {
      if (!temp.hasOwnProperty(guesses[currentGuess][i].toUpperCase())) {
        temp[guesses[currentGuess][i].toUpperCase()] =
          check[currentGuess].letterStatus[i];
      }
    }
    setKeysObject(temp);
  };

  const postGuess = async (guess: String) => {
    try {
      const response = await fetch("/api/v1/game/guess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guess: guess,
          wordID: serverGuessInfo,
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
    const guessesNew = guessesArray.map((guess, index) => {
      if (index === totalGuesses - currentGuess) {
        return guessString;
      } else {
        return guess;
      }
    });

    const checkNew = checkArray.map((letterStatusObject, index) => {
      if (index === totalGuesses - currentGuess) {
        return { letterStatus: apiResponse.evaluation.letterStatus };
      } else {
        return letterStatusObject;
      }
    });

    setGuessesArray(guessesNew);

    setCheckArray(checkNew);

    keyStatusFunc(guessesNew, checkNew);

    // hier könnte man direkt ein objekt bauen und dieses an das keyboard objekt schicken
    setRoundWon(apiResponse.wordGuessed);
    if (apiResponse.wordGuessed) confettiFunc();
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

  const confettiFunc = () => {
    var myCanvas = document.createElement("canvas");
    document.body.appendChild(myCanvas);

    var myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: false,
    });
    myConfetti({
      particleCount: 200,
      disableForReducedMotion: true,
      spread: 300,
      // any other options from the global
      // confetti function
    });

    setTimeout(() => {
      myConfetti.reset();
      document.querySelector("canvas")?.remove();
    }, 2900);
  };

  return (
    <>
      {/* <div className="h-4/6 md:h-3/6 flex-grow items-center"> */}
      <div className="flex justify-center items-center flex-grow mt-2">
        <Profile
          setGuessInfo={setServerGuessInfo}
          currentRoundEnd={roundWon}
          resetRound={resetRound}
        />
        <div>
          {[...Array(totalGuesses + 1)].map((_, i) => {
            return (
              <CharBoxRow
                key={i}
                guessedRow={i < totalGuesses - currentGuess}
                guess={
                  i == totalGuesses - currentGuess
                    ? guessString
                    : guessesArray[i]
                }
                checkArr={checkArray[i] && checkArray[i]}
                boxCount={totalGuesses}
              />
            );
          })}
        </div>
      </div>
      {/* <div className="flex justify-center">*/}
      <div className="keyboard w-screen max-w-sm">
        {/* <div className="flex-grow-0"> */}
        <KeyBoard handleClick={handleClick} keyStatus={keysObject} />
        {/*   </div>
        </div> */}
      </div>
    </>
  );
};
