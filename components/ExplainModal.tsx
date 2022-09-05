import React, { FunctionComponent, useState, useEffect } from "react"; // we need this to make JSX compile
import { CharBoxRow } from "./CharBoxRow";
import { XCircleIcon } from '@heroicons/react/outline'

interface ModalProps {
  showModal: (boolean) => void;
}

const ExplainModal: FunctionComponent<ModalProps> = ({showModal} : ModalProps) => {


  const handleClickOutside = (e: MouseEvent) => {
    const parent = document.querySelector('#modal')
    if (parent && e.target && !parent.contains(e.target as Node)) {
      showModal(false)
    }
  }


  useEffect(() => {
    document.addEventListener("click",handleClickOutside)
    return() => {
      document.removeEventListener("click",handleClickOutside)
    }
  }, [])






  return (
    <div className="absolute h-full">
    <div className="absolute h-screen w-full bg-black opacity-60"></div>
    <div id="modal" className="max-h-screen overflow-y-scroll relative rounded bg-slate-600 mt-4 mx-auto p-4 w-11/12 sm:w-8/12">
      <XCircleIcon className="hover:text-black absolute right-0 top-0 m-2 w-8 h-8" onClick={() => showModal(false)}/>
      <h1 className="text-lg font-bold">Wie funktioniert Wordle?</h1>
      <p className="my-1">Errate das versteckte Wort in 6 Versuchen.</p>
      <p className="my-1">Jeder Tipp muss ein gültiges Wort mit 5 Buchstaben sein. Sie können keine Wörter eingeben, die keinen Sinn ergeben oder zufällige Buchstaben. Drücken Sie die Eingabetaste, um den Tipp abzugeben. Die Umlaute Ä, Ö und Ü wurden durch AE, OE bzw. UE ersetzt, und ẞ durch SS.</p>
      <p className="my-1">Nach dem Absenden ändert sich die Farbe der Kacheln (Hintergrund) wie in den folgenden Beispielen.</p>
      <hr className="my-2"/>
      <h2 className="font-bold">Beispiele</h2>
      <CharBoxRow guess="WORTL" guessedRow={true} checkArr={{letterStatus: [1, 3, 1, 1, 1]}} boxCount={5}/>
      <p className="my-1">Der Buchstabe <b>O</b> befindet sich an der richtigen Stellen (gleiche Stelle wie im gesuchten Wort)</p>
      <CharBoxRow guess="KLEID" guessedRow={true} checkArr={{letterStatus: [1, 1, 2, 1, 1]}} boxCount={5}/>
      <p className="my-1">Der Buchstabe <b>E</b> ist im Wort enthalten befindet sich aber nicht richtigen Stellen</p>
      <p className="my-1">Ausgegraute Buchstaben kommen an keiner Stelle des Wortes vor</p>
    </div>

    </div>
  );
}

export default ExplainModal;