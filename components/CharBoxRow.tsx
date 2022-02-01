import React, { FunctionComponent, useState } from "react"; // we need this to make JSX compile
import { CharBox } from "./CharBox";
import { KeyBoard } from "./KeyBoard";
import { guessCheck } from "../types";

type CharBoxRowProps = {
  guess: String; // can be null
  checkArr?: guessCheck;
  guessedRow?: Boolean;
  boxCount: Number;
};

export const CharBoxRow: FunctionComponent<CharBoxRowProps> = ({
  guess,
  guessedRow,
  checkArr,
  boxCount,
}) => (
  <>
    <div className="flex flex-wrap justify-center gap-1 mb-1">
      {[...Array(boxCount)].map((_, i: number) => {
        return (
          <CharBox key={i}
            char={guess[i] ? guess[i] : " "}
            status={guessedRow && checkArr && checkArr.letterStatus[i]}
          />
        );
      })}
    </div>
  </>
);
