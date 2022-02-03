

import React from 'react'; // we need this to make JSX compile
import { BackspaceIcon } from '@heroicons/react/outline'

type KeyProps = {
  className?: string,
  status?: number
  letter: string,
  passToGame: (char: string) => void
}

export const Key = ({ letter, className, status, passToGame }: KeyProps) =>  <span 
  onClick={() => status !== 1 ? passToGame(letter) : ""}
  // className={`py-3 px-2.5 lg:py-3 lg:px-4 bg-slate-300 hover:bg-slate-200 text-black rounded-md ${className}`}>
  className={`cursor-pointer grow ${letter.length == 1 ? 'basis-0' :'basis-3'} overflow-hidden text-center flex flex-col justify-center 
      ${status === 1 ? "bg-gray-400" : status === 2 ? "bg-yellow-500" : status === 3 ? "bg-green-500" : "bg-slate-300 hover:bg-slate-200"}  
             text-black rounded-md ${className}`}>
  { letter === "DELET" ? <span className='w-100 flex justify-center'><BackspaceIcon className='h-8 w-5 lg:h-8 lg:w-7 text-slate-700'/></span> : 
    letter }
  </span>