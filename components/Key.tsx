

import React from 'react'; // we need this to make JSX compile
import { BackspaceIcon } from '@heroicons/react/outline'

type KeyProps = {
  className?: string,
  letter: string,
  passToGame: (char: string) => void
}

export const Key = ({ letter, className, passToGame }: KeyProps) =>  <span 
  onClick={() => passToGame(letter)}
  className={`py-3 px-4 mx-1 bg-slate-300 hover:bg-slate-200 text-black rounded-md ${className}`}>
  { letter === "DELET" ? <BackspaceIcon className='h-8 w-7 text-slate-700'/> : 
    letter }
  </span>