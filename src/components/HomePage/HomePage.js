import React, {useEffect, useState} from "react";
import './_homePage.scss';
import { Link } from "react-router-dom";

export default function HomePage ({files}) {

    const [setNumber, setSetNumber] = useState("")

    useEffect(() => {
        let newSets = [];
        files.forEach((file) => {
            if (!newSets.includes(file.field)) {
                newSets.push(file.field)
            }
        })
        setSetNumber(newSets.length)
    }, [files])

    return (
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
                <Link className="optionBox" to="/add">
                    <p className="option__newFlashcard">
                        Add<br/>flashcard
                    </p>
                    <i className="fas fa-plus"></i>
                </Link>
            </div>
        </div>
    )
}