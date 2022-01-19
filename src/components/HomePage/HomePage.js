import React from "react";
import './_homePage.scss';

export default function HomePage () {

    return (
        <div className="homepage">
            <div className="optionBox">
                <p className="option__yourFlashcards">
                    Your<br/>flashcards
                </p>
            </div>
            <div className="optionBox">
                <p className="option__newFlashcard">
                    Add<br/>flashcard
                </p>
            </div>
        </div>
    )
}