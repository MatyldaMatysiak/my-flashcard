import React from "react";
import './_flashcard.scss';

export default function Flashcard({question, answer}) {
    return (
        <div className="flashcardBox">
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