import React, {useState} from "react";
import './_flashcard.scss';

export default function Flashcard({question, answer}) {

    const [side, setSide] = useState("front")

    const handleChangeSide = () => {
        if (side ==="front") {
            setSide("back")
        } else {
            setSide("front")
        }
    }

    return (
        <div className={`flashcardBox ${side}`} onClick={handleChangeSide}>
            <div className="flashcard__inner">
                <div className="flashcard__front">
                    <p className="flashcard__text">{question}</p>
                </div>
                <div className="flashcard__back">
                    <p className="flashcard__text">{answer}</p>
                </div>
            </div>
        </div>
    )
}