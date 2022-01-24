import React, {useEffect, useState} from "react";
import Flashcard from "../flashcard/Flashcard";
import './_flashcardBig.scss';
import {Link} from "react-router-dom";

export default function FlashcardBig({setBig}) {
    const [size] = useState("flashcardBig");
    const [actualFlashCard, setActualFlashCard] = useState(setBig[0]);
    const [flashcardIndex, setFlashcardIndex] = useState(0);

    console.log(setBig)

    useEffect(() => {
        setActualFlashCard(setBig[0])
    }, [setBig])
    // console.log(setBig)

    const handleNextFlashcard = () => {
        if (flashcardIndex + 1 === setBig.length) {
        } else {
            setFlashcardIndex(index => index + 1);
            setActualFlashCard(setBig[flashcardIndex + 1])
        }
    }

    const handlePreviousFlashcard = () => {
        if (flashcardIndex - 1 === -1) {
        } else {
            setFlashcardIndex(index => index - 1);
            setActualFlashCard(setBig[flashcardIndex - 1])
        }
    }

    return (
        <div className="flashcardBig__container">
            <div className="flashcardBig__editBox">
                <button className="btn btn-edit">
                    <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-changeDisplay">
                    <p>question</p>
                    <i className="fas fa-exchange-alt changeDisplay-icon"></i>
                    <p>answer</p>
                </button>
                <button className="btn btn-delete">
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
            <div className="flashcardBig__change">
                <i className="change__previous fas fa-chevron-left fa-3x" onClick={handlePreviousFlashcard}> </i>
                <Flashcard size={size} actualFlashCard={actualFlashCard}/>
                <i className="change_next fas fa-chevron-right fa-3x" onClick={handleNextFlashcard}> </i>
            </div>
            <Link to={`/sets/${setBig[0].field}`} className="flashcardBig__back">
                <i className="fas fa-arrow-left"></i>
                <p className="flashcardBig__back-text">back to flashcard list</p>
            </Link>
        </div>
    )
}