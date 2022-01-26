import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./_yourFields.scss"

export default function YourFields({files, setSetNumber}) {
    const [sets, setSets] = useState([]);

    useEffect(() => {
        let newSets = [];
        files.forEach((file) => {
            if (!newSets.includes(file.field)) {
                newSets.push(file.field)
            }
        })
        setSets([...newSets])
    }, [files])

    return (
        <div className="sets">
            <div className="setsNavigation">
                <Link className="setsNavigation__box" to="/all">
                    <h3>All flashcards</h3>
                    <i className="far fa-sticky-note"></i>
                </Link>
                <Link className="setsNavigation__box" to="/add">
                    <h3>Add flashcard</h3>
                    <i className="fas fa-plus"></i>
                </Link>
                <Link className="setsNavigation__box setsNavigation__back" to="/add">
                    <h3>Back</h3>
                    <i> </i>
                </Link>
            </div>
            <div className="setsMain">
                <div className="setsHeader">
                    <div className="setsHeader__line"></div>
                    <div>
                        <h2 className="setsHeader__title">Your sets</h2>
                    </div>
                    <div className="setsHeader__line"></div>
                </div>
                <div className="setsContainer">
                    {sets.map(set => <Link to={`/sets/${set}`} className="setBox" key={set}>
                        <p className="setName">{set}</p>
                    </Link>)}
                </div>
            </div>

        </div>
    )
}
