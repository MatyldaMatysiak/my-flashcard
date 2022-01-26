import React, {useEffect, useState} from "react";
import './_homePage.scss';
import {Link} from "react-router-dom";
import Modal from "../madal/Modal";
import NewFlashcard from "../NewFlashcard/NewFlashcard";

export default function HomePage({files, handleAddFlashcard, setAdd}) {

    const [setNumber, setSetNumber] = useState("")
    const [modalRender, setModalRender] = useState("close")

    useEffect(() => {
        let newSets = [];
        files.forEach((file) => {
            if (!newSets.includes(file.field)) {
                newSets.push(file.field)
            }
        })
        setSetNumber(newSets.length)
    }, [files])

    const handleAdd = () => {
        setModalRender("open")
    }

    return (
        <>
            <div className="homepage">
                <div className="flashcardInfo">
                    <div className="flashcardInfo__flashNumber flashcardInfo__box">
                        <h3>You have {setNumber} sets!</h3>
                    </div>
                    <div className="flashcardInfo__setNumber flashcardInfo__box">
                        <h3>You have {files.length} flashcards!</h3>
                    </div>
                </div>
                <div className="homeMenu">
                    <Link className="optionBox" to="/sets">
                        <p className="option__yourFlashcards">
                            Your sets
                        </p>
                        <i className="far fa-folder-open"></i>
                    </Link>
                    <div className="optionBox" onClick={handleAdd}>
                        <p className="option__newFlashcard">
                            Add<br/>flashcard
                        </p>
                        <i className="fas fa-plus"></i>
                    </div>
                </div>
            </div>
            {modalRender === "open" ? <Modal><NewFlashcard handleAddFlashcard={handleAddFlashcard}
                                                           setAdd={setAdd}
                                                           setModalDisplay={setModalRender}/></Modal> : <></>}
        </>
    )
}