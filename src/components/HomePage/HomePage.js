import React from "react";
import './_homePage.scss';
import { Link } from "react-router-dom";

export default function HomePage () {

    return (
        <div className="homepage">
            <Link className="optionBox" to="/sets">
                <p className="option__yourFlashcards">
                    Your<br/>flashcards
                </p>
                <i className="far fa-folder-open"></i>
            </Link>
            <Link className="optionBox" to="/add">
                <p className="option__newFlashcard">
                    Add<br/>flashcard
                </p>
                <i className="fas fa-plus"></i>
            </Link>
        </div>
    )
}