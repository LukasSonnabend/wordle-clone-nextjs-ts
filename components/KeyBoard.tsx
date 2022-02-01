

import React from 'react'; // we need this to make JSX compile
import {Key} from './Key';


interface KeyBoardProps{ 
  handleClick: (char: string) => void
}

//  TODO: 
  //Checked keys müssen unten gesperrt bzw grün hinterlegt werden 
  // Wäre nice wenn der delete button die gleiche breite hätte wie 
export const KeyBoard = (Props: KeyBoardProps) => <div>
  {/* Row1 */}
  <div className='flex max-h-12'>
    <Key letter="Q" passToGame={Props.handleClick}/>
    <Key letter="W" passToGame={Props.handleClick}/>
    <Key letter="E" passToGame={Props.handleClick}/>
    <Key letter="R" passToGame={Props.handleClick}/>
    <Key letter="T" passToGame={Props.handleClick}/>
    <Key letter="Z" passToGame={Props.handleClick}/>
    <Key letter="U" passToGame={Props.handleClick}/>
    <Key letter="I" passToGame={Props.handleClick}/>
    <Key letter="O" passToGame={Props.handleClick}/>
    <Key letter="P" passToGame={Props.handleClick}/>
    <Key letter="Ü" passToGame={Props.handleClick}/>
  </div>
  {/* Row2 */}
  <div className='flex my-2 max-h-14 mx-4'>
    <Key letter="A" passToGame={Props.handleClick}/>
    <Key letter="S" passToGame={Props.handleClick}/>
    <Key letter="D" passToGame={Props.handleClick}/>
    <Key letter="F" passToGame={Props.handleClick}/>
    <Key letter="G" passToGame={Props.handleClick}/>
    <Key letter="H" passToGame={Props.handleClick}/>
    <Key letter="J" passToGame={Props.handleClick}/>
    <Key letter="K" passToGame={Props.handleClick}/>
    <Key letter="L" passToGame={Props.handleClick}/>
    <Key letter="Ö" passToGame={Props.handleClick}/>
    <Key letter="Ä" passToGame={Props.handleClick}/>
  </div>
  {/* Row3 */}
  <div className='flex max-h-12'>
    <Key letter="ENTER" passToGame={Props.handleClick}/>
    <Key letter="Y" passToGame={Props.handleClick}/>
    <Key letter="X" passToGame={Props.handleClick}/>
    <Key letter="C" passToGame={Props.handleClick}/>
    <Key letter="V" passToGame={Props.handleClick}/>
    <Key letter="B" passToGame={Props.handleClick}/>
    <Key letter="N" passToGame={Props.handleClick}/>
    <Key letter="M" passToGame={Props.handleClick}/>
    <Key letter="DELET" className="min-w-12" passToGame={Props.handleClick}/>
  </div>
</div>
