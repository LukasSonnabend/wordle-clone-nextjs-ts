import React, { FunctionComponent, useState, useEffect } from "react";

interface ProfileProps {
  setGuessInfo: (info: number[]) => void;
  resetRound: () => void;
  currentRoundEnd: boolean;
}

export const Profile = ({setGuessInfo, resetRound, currentRoundEnd}: ProfileProps) => {
  // check if there is word in localStorage
  useEffect(() => {
    if (currentRoundEnd) {
      localStorage.removeItem("word");
    }

    (async () => {
      if (localStorage.getItem("word"))
      setGuessInfo(JSON.parse(localStorage.getItem("word") || "{guessWord: 'namen'}").guessWord);
      else localStorage.setItem("word", JSON.stringify(await getNewWord()));
    })()

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
