

import React from 'react'; // we need this to make JSX compile
import {Key} from './Key';


interface KeyBoardProps{ 
  handleClick: (char: string) => void,
  keyStatus: object
}

//  TODO: 
  //Checked keys müssen unten gesperrt bzw grün hinterlegt werden 
  // Wäre nice wenn der delete button die gleiche breite hätte wie 
export const KeyBoard = (Props: KeyBoardProps) => <div className='mt-2 h-full'>
  {/* Row1 */}
  <div className='flex justify-end w-full gap-0.5 h-1/4 lg:gap-1'>
    <Key letter="Q" status={Props.keyStatus["Q"]} passToGame={Props.handleClick}/>
    <Key letter="W" status={Props.keyStatus["W"]} passToGame={Props.handleClick}/>
    <Key letter="E" status={Props.keyStatus["E"]} passToGame={Props.handleClick}/>
    <Key letter="R" status={Props.keyStatus["R"]} passToGame={Props.handleClick}/>
    <Key letter="T" status={Props.keyStatus["T"]} passToGame={Props.handleClick}/>
    <Key letter="Z" status={Props.keyStatus["Z"]} passToGame={Props.handleClick}/>
    <Key letter="U" status={Props.keyStatus["U"]} passToGame={Props.handleClick}/>
    <Key letter="I" status={Props.keyStatus["I"]} passToGame={Props.handleClick}/>
    <Key letter="O" status={Props.keyStatus["O"]} passToGame={Props.handleClick}/>
    <Key letter="P" status={Props.keyStatus["P"]} passToGame={Props.handleClick}/>
    <Key letter="Ü" status={Props.keyStatus["Ü"]} passToGame={Props.handleClick}/>
  </div>
  {/* Row2 */}
  <div className='flex justify-end w-full my-2 h-1/4 mx-2 gap-0.5 lg:gap-1 lg:mx-4'>
    <Key letter="A" status={Props.keyStatus["A"]} passToGame={Props.handleClick}/>
    <Key letter="S" status={Props.keyStatus["S"]} passToGame={Props.handleClick}/>
    <Key letter="D" status={Props.keyStatus["D"]} passToGame={Props.handleClick}/>
    <Key letter="F" status={Props.keyStatus["F"]} passToGame={Props.handleClick}/>
    <Key letter="G" status={Props.keyStatus["G"]} passToGame={Props.handleClick}/>
    <Key letter="H" status={Props.keyStatus["H"]} passToGame={Props.handleClick}/>
    <Key letter="J" status={Props.keyStatus["J"]} passToGame={Props.handleClick}/>
    <Key letter="K" status={Props.keyStatus["K"]} passToGame={Props.handleClick}/>
    <Key letter="L" status={Props.keyStatus["L"]} passToGame={Props.handleClick}/>
    <Key letter="Ö" status={Props.keyStatus["Ö"]} passToGame={Props.handleClick}/>
    <Key letter="Ä" status={Props.keyStatus["Ä"]} passToGame={Props.handleClick}/>
  </div>
  {/* Row3 */}
  <div className='flex justify-center w-full gap-0.5 lg:gap-1 h-1/4'>
    <Key letter="ENTER" passToGame={Props.handleClick}/>
    <Key letter="Y" status={Props.keyStatus["Y"]} passToGame={Props.handleClick}/>
    <Key letter="X" status={Props.keyStatus["X"]} passToGame={Props.handleClick}/>
    <Key letter="C" status={Props.keyStatus["C"]} passToGame={Props.handleClick}/>
    <Key letter="V" status={Props.keyStatus["V"]} passToGame={Props.handleClick}/>
    <Key letter="B" status={Props.keyStatus["B"]} passToGame={Props.handleClick}/>
    <Key letter="N" status={Props.keyStatus["N"]} passToGame={Props.handleClick}/>
    <Key letter="M" status={Props.keyStatus["M"]} passToGame={Props.handleClick}/>
    <Key letter="DELET" className="min-w-12" passToGame={Props.handleClick}/>
  </div>
</div>
