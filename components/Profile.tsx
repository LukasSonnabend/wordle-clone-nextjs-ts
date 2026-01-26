import React, { FunctionComponent, useState, useEffect } from "react";

interface ProfileProps {
  setGuessInfo: (info: number[]) => void;
  resetRound: () => void;
  currentRoundEnd: boolean;
  setLoading?: (val: boolean) => void;
}

export const Profile = ({setGuessInfo, resetRound, currentRoundEnd}: ProfileProps) => {
  // check if there is word in localStorage
  useEffect(() => {
    if (currentRoundEnd) {
      localStorage.removeItem("word");
      // clear any persisted round so the next round starts fresh
      localStorage.removeItem("round");
    }

    (async () => {
      if (setLoading) setLoading(true);
      const loadStoredWord = () => {
        const raw = localStorage.getItem("word");
        if (!raw) return null;
        try {
          const parsed = JSON.parse(raw);
          if (
            parsed &&
            Array.isArray(parsed.guessWord) &&
            typeof parsed.guessWord[0] === "number" &&
            typeof parsed.guessWord[1] === "number"
          ) {
            return parsed.guessWord;
          }
        } catch (e) {
          // fallthrough
        }
        return null;
      };

      const stored = loadStoredWord();
      if (stored) {
        setGuessInfo(stored);
      } else {
        const newWord = await getNewWord();
        if (newWord && Array.isArray(newWord.guessWord)) {
          localStorage.setItem("word", JSON.stringify(newWord));
          setGuessInfo(newWord.guessWord);
        }
      }

      if (setLoading) setLoading(false);

      if (currentRoundEnd){
        if (localStorage.getItem("profile")) {
          const profile = JSON.parse(localStorage.getItem("profile") || "{}");
          profile.totalRounds++;
          localStorage.setItem("profile", JSON.stringify(profile));
        } else {
          localStorage.setItem("profile", JSON.stringify({totalRounds: 1, firstDay: new Date().toLocaleDateString()}));
        }

        const timer = setTimeout(() => {
          resetRound();
        }, 3000);
        return () => clearTimeout(timer);
      }

    })()
  }, [currentRoundEnd]);

  const getNewWord = async () => {
    try {
      const response = await fetch("/api/v1/game/word", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const word2Guess = await response.json();
      return word2Guess;
    } catch (error) {
      console.error(error);
    }
  };
  return null;
};
