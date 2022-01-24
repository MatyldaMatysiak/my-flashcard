import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import './_set.scss';
import {Link} from "react-router-dom";
import FlashcardBig from "../flashcardBig/FlashcardBig";
import Tiles from "../tiles/Tiles";

export default function Set({files, add, setSetBig, handleDeleteFlashcard, remove, setRemove}) {
    const {field} = useParams()
    const [set, setSet] = useState([])
    const [filtersList, setFilterList] = useState([])
    const [filteredSet, setFilteredSet] = useState([])
    const [searchFlashInput, setSearchFlashInput] = useState("")
    const [tiles, setTiles] = useState(true)

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
        // setSetBig([...newSet])
    }, [files, field, add, remove])

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

    const handleSwitchToOne = () => {
        setTiles(false)
    }

    const handleSwitchToTiles = () => {
        setTiles(true)
    }

    return (
        <>
            <div className="setPage">
                <div className="filtersBox">
                    <button className="btn__filter">
                        <i className="fas fa-plus"></i>
                        <p>Add flashcard</p>
                    </button>
                    <ul>
                        {filtersList.map(filter => <li className="filterElement" key={filter}
                                                       onClick={() => handleChooseFilter(filter)}>{filter}</li>)}
                    </ul>
                    <Link to="/sets">
                        <button className="btn__filter">
                            <i className="fas fa-arrow-left"></i>
                            <p>Back to sets</p>
                        </button>
                    </Link>
                </div>
                <div className="setPage__main">
                    <div className="main__header">
                        <div className="switch__display">
                            <button className="btn btn__oneFlashcard" onClick={handleSwitchToOne}>
                                <i className="fas fa-square"></i>
                            </button>
                            <button className="btn btn__oneFlashcard" onClick={handleSwitchToTiles}>
                                <i className="fas fa-th"></i>
                            </button>
                        </div>
                        <form className="searchInSet" onSubmit={(e) => handleSearchFlash(e, searchFlashInput)}>
                            <label htmlFor="searchFlashcard"/>
                            <input type="text" id="searchFlashcard" placeholder="find flashcard..."
                                   value={searchFlashInput} onChange={(e) => setSearchFlashInput(e.target.value)}/>
                            <button type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                    </div>

                    <div className="flashcards">
                        {tiles ? <Tiles filteredSet={filteredSet}/> :
                            <FlashcardBig filteredSet={filteredSet} handleDeleteFlashcard={handleDeleteFlashcard}
                                          setRemove={setRemove} remove={remove}/>}
                    </div>

                </div>
            </div>
        </>

    )
}