import React, { FunctionComponent, useState, useEffect, useRef } from "react"; // we need this to make JSX compile
import { CharBoxRow } from "./CharBoxRow";
import { Profile } from "./Profile";
import { KeyBoard } from "./KeyBoard";
import { guessCheck, GuessResponse, round } from "../types";
import confetti from "canvas-confetti";
import { loadRound, persistRound } from "../functions/gameaux";
import ExplainModal from "./ExplainModal";
import { InformationCircleIcon } from '@heroicons/react/outline'
import { arrayBuffer } from "stream/consumers";


export const GameView: FunctionComponent<{
  initialString?: string;
  initialGuess?: number;
}> = ({ initialString = "", initialGuess = 6}) => {
  // ---------------------- State
  // ---------------------- State
  // ---------------------- State
  const [guessesArray, setGuessesArray] = useState<string[]>(
    Array<string>(initialGuess).fill("")
  );
  const [guessString, setGuessString] = useState<string>(initialString);
  // inital guesses müssen von difficulty reingegeben werden
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [checkArray, setCheckArray] = useState<guessCheck[]>(
    Array(initialGuess+1).fill({ letterStatus: [] })
  );
  const [serverGuessInfo, setServerGuessInfo] = useState<number[]>([]);
  const [keysObject, setKeysObject] = useState<object>({});
  const [roundWon, setRoundWon] = useState<boolean>(false);
  const [roundLost, setRoundLost] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // ----------------------
  // ----------------------
  // ----------------------
  const guessStringRef = useRef(guessString);

  const setGuessStringRef = (data: string) => {
    guessStringRef.current = data;
    setGuessString(data);
  };


  const totalGuesses = initialGuess;

  useEffect(() => {
    // persistRound(guessesArray, checkArray, currentGuess, keysObject)
    let loadedRound: round = loadRound()
    if (loadedRound) {
        setGuessesArray(loadedRound.guesses)
        setCheckArray(loadedRound.checks)
        setCurrentGuess(loadedRound.currentGuess)
        setKeysObject(loadedRound.keysObject)
    } else {
      setModalOpen(true)
    }
  }, []);

  useEffect(() => {
    persistRound(guessesArray, checkArray, currentGuess, keysObject)
  }, [guessesArray, checkArray, currentGuess, keysObject])


  useEffect(() => {
    if (guessesArray.filter((guess) => guess !== "").length === initialGuess)
      setRoundLost(true);

  }, [guessesArray])


  const resetRound = () => {
    setGuessStringRef("")
    setGuessesArray(Array(totalGuesses).fill(""));
    setCurrentGuess(totalGuesses);
    setCheckArray(Array(totalGuesses).fill({ letterStatus: [] }));
    setRoundWon(false);
    setKeysObject({});
  };

  const keyStatusFunc = (guesses: string[], check: guessCheck[]) => {
    const temp = keysObject;
    let currentGuessIndex = totalGuesses - currentGuess;
    for (var i = 0; i < guesses[currentGuessIndex].length; i++) {
      if (!temp.hasOwnProperty(guesses[currentGuessIndex][i].toUpperCase())) {
        temp[guesses[currentGuessIndex][i].toUpperCase()] =
          check[currentGuessIndex].letterStatus[i];
      } else {
        if (temp[guesses[currentGuessIndex][i].toUpperCase()] < check[currentGuessIndex].letterStatus[i]) {
          temp[guesses[currentGuessIndex][i].toUpperCase()] =
            check[currentGuessIndex].letterStatus[i];
        }
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
    if (guessString.length < initialGuess-1) {
      alert("Bitte 5 Buchstaben eingeben");
      return;
    }

    let apiResponse: GuessResponse = await postGuess(guessString);
    console.log(apiResponse);

    while(!apiResponse || !apiResponse.hasOwnProperty("validGuess"))
      apiResponse = await postGuess(guessString);

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

    setRoundWon(apiResponse.wordGuessed);

    if (apiResponse.wordGuessed) confettiFunc();
    // reset guess
    setGuessStringRef("");
    setCurrentGuess(currentGuess - 1);
  };

  // hier post auf api irgendwie muss das zu eratende wort gematcht werden
  const handleClick = async (char: String) => {
    console.log(guessString.length)
    if (char === "DELET") {
      setGuessStringRef(guessString.slice(0, -1));
    } else if (char === "ENTER") {
      await enterFunction();
    } else if (guessStringRef.current.length < 5) {
      setGuessStringRef(`${guessStringRef.current}${char}`)
    };
  };

  const confettiFunc = () => {
    var myCanvas = document.createElement("canvas");
    document.body.appendChild(myCanvas);

    var myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });
    myConfetti({
      particleCount: 300,
      angle: 270,
      disableForReducedMotion: true,
      spread: 180,
      startVelocity: 50,
      origin: {
        y: -0.5,
      }
    });

    setTimeout(() => {
      myConfetti.reset();
      document.querySelector("canvas")?.remove();
    }, 2900);
  };

  return (
    <>
      <span className="w-full text-right mt-2 pr-2">
      <button
      type="button"
      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
      <span className="sr-only">Hilfe</span>
      <InformationCircleIcon className="h-6 w-6" aria-hidden="true" onClick={() => setModalOpen(true)}/>
      </button>
      </span>
      { modalOpen && <ExplainModal showModal={(val) => setModalOpen(val)}/>}
      <div className="flex justify-center items-center flex-grow mt-2">
        <Profile
          setGuessInfo={setServerGuessInfo}
          currentRoundEnd={roundWon || roundLost}
          // currentGuess={currentGuess}
          resetRound={resetRound}
        />
        <div>
          {[...Array(totalGuesses)].map((_, i) => {
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
                boxCount={totalGuesses-1}
              />
            );
          })}
        </div>
      </div>
      <div className="keyboard w-screen max-w-sm">
        <KeyBoard handleClick={handleClick} keyStatus={keysObject} />

      </div>
    </>
  );
};
