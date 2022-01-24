import React, {useEffect, useState} from "react";
import Flashcard from "../flashcard/Flashcard";
import './_flashcardBig.scss';
import {Link} from "react-router-dom";

export default function FlashcardBig({filteredSet, handleDeleteFlashcard, remove, setRemove}) {
    const [size] = useState("flashcardBig");
    const [actualFlashCard, setActualFlashCard] = useState(filteredSet[0]);
    const [flashcardIndex, setFlashcardIndex] = useState(0);

    useEffect(() => {
        setActualFlashCard(filteredSet[0])
    }, [filteredSet])

    const handleNextFlashcard = () => {
        if (flashcardIndex + 1 === filteredSet.length) {
        } else {
            setFlashcardIndex(index => index + 1);
            setActualFlashCard(filteredSet[flashcardIndex + 1])
        }
    }

    const handlePreviousFlashcard = () => {
        if (flashcardIndex - 1 === -1) {
        } else {
            setFlashcardIndex(index => index - 1);
            setActualFlashCard(filteredSet[flashcardIndex - 1])
        }
    }

    const deleteFlashcard = () => {
        handleDeleteFlashcard(actualFlashCard.id);
        setRemove(!remove)
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
                <button className="btn btn-delete" onClick={deleteFlashcard}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
            <div className="flashcardBig__change">
                <i className="change__previous fas fa-chevron-left fa-3x" onClick={handlePreviousFlashcard}> </i>
                <Flashcard size={size} actualFlashCard={actualFlashCard}/>
                <i className="change_next fas fa-chevron-right fa-3x" onClick={handleNextFlashcard}> </i>
            </div>
        </div>
    )
}