import React, {useState} from "react";
import './_flashcard.scss';

export default function Flashcard({question, answer, size, actualFlashCard}) {

    const [side, setSide] = useState("front")

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
                    <p className="flashcard__text">{size === "flashcardBig" ? actualFlashCard.question : question}</p>
                </div>
                <div className="flashcard__back">
                    <p className="flashcard__text">{size === "flashcardBig" ? actualFlashCard.answer : answer}</p>
                </div>
            </div>
        </div>
    )
}