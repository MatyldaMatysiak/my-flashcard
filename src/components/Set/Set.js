import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import './_set.scss';

export default function Set({files, add}) {
    const { field } = useParams()
    const [set, setSet] = useState([])
    const [filtersList, setFilterList] = useState([])
    const [filteredSet, setFilteredSet] = useState([])
    const [searchFlashInput, setSearchFlashInput] = useState("")

    useEffect(() => {
        const newSet = files.filter(function (file) {
            return file.field === field;
        });

        setSet([...newSet]);

        let newFiltersList = ["all"];
        newSet.forEach(list => {
            list.filters.forEach(filter => {
                if (!newFiltersList.includes(filter)) {
                    newFiltersList.push(filter)
                }
            })
        })

        setFilterList([...newFiltersList])
        setFilteredSet([...newSet])
    }, [files, field, add])

    const handleChooseFilter = (filter) => {
        // console.log(filter)
        if (filter === "all") {
            setFilteredSet([...set])
        } else {
            const newFilteredSet = set.filter(function (element) {
                return element.filters.includes(filter);
            });
            setFilteredSet([...newFilteredSet])
        }
    }

    const handleSearchFlash = (e, searchFlashInput) => {
        e.preventDefault();
        const newFilteredSet = [];

        console.log(searchFlashInput)

        filteredSet.forEach(flash => {
            if (flash.question.includes(searchFlashInput) || flash.answer.includes(searchFlashInput)) {
                newFilteredSet.push(flash)
            }
        })
        console.log(newFilteredSet)

        setFilteredSet([...newFilteredSet]);
        setSearchFlashInput("")
    }

    return (
        <div className="setPage">
            <div className="filtersBox">
                <ul>
                    {filtersList.map(filter => <li className="filterElement" key={filter} onClick={() => handleChooseFilter(filter)}>{filter}</li>)}
                </ul>
            </div>
            <div className="flashcards">
                {filteredSet.map(flashcard => <div className="flashcardBox" key={flashcard.question}>
                    <p className="flashcardName">{flashcard.question}</p>
                </div>)}
            </div>
            <form className="searchInSet" onSubmit={(e) => handleSearchFlash(e, searchFlashInput)}>
                <label htmlFor="searchFlashcard" />
                <input type="text" id="searchFlashcard" placeholder="find flashcard..." value={searchFlashInput} onChange={(e) => setSearchFlashInput(e.target.value)}/>
                <button type="submit">
                    <i className="fas fa-search"></i>
                </button>
            </form>

        </div>
    )
}