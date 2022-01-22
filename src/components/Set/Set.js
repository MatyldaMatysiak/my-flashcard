import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Set({files, add}) {
    const { field } = useParams()
    const [set, setSet] = useState([])
    console.log(set)

    useEffect(() => {
        const newSet = files.filter(function (file) {
            return file.field === field;
        });
        setSet([...newSet])
    }, [files, field, add])

    return (
        <div className="flashcard">
            {set.map(flashcard => <div className="flashcardBox" key={flashcard.question}>
                <p className="setName">{flashcard.question}</p>
            </div>)}
        </div>
    )
}