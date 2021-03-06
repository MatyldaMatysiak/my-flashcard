import React, {useEffect, useState} from "react";
import './_flashcard.scss';

export default function Flashcard({question, answer, size, flash, actualFlashCard}) {

    const [side, setSide] = useState("front")

    useEffect(() => {
        setSide("front")
    }, [flash, actualFlashCard])

    const handleChangeSide = () => {
        if (side ==="front") {
            setSide("back")
        } else {
            setSide("front")
        }
    }

    return (
        <div className={`flashcardBox ${side} ${size}`} onClick={handleChangeSide}>
            <div className="flashcard__inner">
                <div className="flashcard__front">
                    <p className="flashcard__text">{size === "flashcardBig" ? flash.question : question}</p>
                </div>
                <div className="flashcard__back">
                    <p className="flashcard__text">{size === "flashcardBig" ? flash.answer : answer}</p>
                </div>
            </div>
        </div>
    )
}