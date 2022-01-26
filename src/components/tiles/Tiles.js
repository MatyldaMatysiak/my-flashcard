import React from "react";
import Flashcard from "../flashcard/Flashcard";
import './_tiles.scss'

export default function Tiles({filteredSet}) {
    console.log(filteredSet)
    return (
        <div className="tiles__container">
            {filteredSet.map(flashcard => <Flashcard key={flashcard.question} question={flashcard.question} answer={flashcard.answer}/>)}
        </div>
    )
}