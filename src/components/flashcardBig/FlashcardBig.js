import React, {useEffect, useState} from "react";
import Flashcard from "../flashcard/Flashcard";
import './_flashcardBig.scss';
import {Link} from "react-router-dom";
import Modal from "../madal/Modal";
import UpdateFlashcard from "../updateFlashcard/UpdateFlashcard";

export default function FlashcardBig({filteredSet, handleDeleteFlashcard, handleEditFlashcard, remove, setRemove}) {
    const [size] = useState("flashcardBig");
    const [actualFlashCard, setActualFlashCard] = useState(filteredSet[0]);
    const [flashcardIndex, setFlashcardIndex] = useState(0);
    const [modalDisplay, setModalDisplay] = useState("")

    useEffect(() => {
        setActualFlashCard(filteredSet[0])
        setFlashcardIndex(0)
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

    const handleEdit = () => {
        setModalDisplay("open")
    }

    return (
        <>
            <div className="flashcardBig__container">
                <div className="flashcardBig__editBox">
                    <button className="btn btn-edit" onClick={handleEdit}>
                        <i className="fas fa-edit" ></i>
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
                    <div className="changeBox">
                        {filteredSet.map(flash => <div className={`${filteredSet.indexOf(flash) === flashcardIndex ? "active" : "d-none"}`} key={flash.id}><Flashcard size={size} flash={flash} actualFlashCard={actualFlashCard}/></div> )}
                    </div>
                    <i className="change_next fas fa-chevron-right fa-3x" onClick={handleNextFlashcard}> </i>
                </div>
            </div>
            <Modal open={modalDisplay}>
                <UpdateFlashcard flash={actualFlashCard} setModalDisplay={setModalDisplay} handleEditFlashcard={handleEditFlashcard}/>
            </Modal>
        </>
    )
}