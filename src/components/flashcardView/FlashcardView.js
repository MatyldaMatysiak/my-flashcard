import React, {useEffect, useState} from "react";
import './_flashkardView.scss';
import Tiles from "../tiles/Tiles";
import FlashcardBig from "../flashcardBig/FlashcardBig";

export default function FlashcardView({field, filteredSet, setFilteredSet, handleDeleteFlashcard, handleEditFlashcard, setRemove, remove, loader, setLoader}) {
    const [tiles, setTiles] = useState(true)
    const [searchFlashInput, setSearchFlashInput] = useState("")
    const [search, setSearch] = useState("")
    const [activeFilterBox, setActiveFilterBox,] = useState("")
    const [activeSearch, setActiveSearch] = useState("")
    const [searchSet, setSearchSet] = useState("none")
    console.log(searchSet)
    console.log(filteredSet)

    useEffect(() => {
        setSearchSet(filteredSet)
        setActiveFilterBox("")
    }, [filteredSet])

    const handleSwitchToOne = () => {
        setTiles(false)
        setSearch("hidden")
    }

    const handleSwitchToTiles = () => {
        setTiles(true)
        setSearch("")
    }

    const handleSearchFlash = (e, searchFlashInput) => {
        e.preventDefault();
        const newFilteredSet = [];

        filteredSet.forEach(flash => {
            if (flash.question.includes(searchFlashInput) || flash.answer.includes(searchFlashInput)) {
                newFilteredSet.push(flash)
            }
        })

        setSearchSet([...newFilteredSet]);
        setActiveSearch(searchFlashInput);
        setActiveFilterBox("open");
        setSearchFlashInput("")
    }

    const handleCloseSearchFilter = () => {
        setActiveFilterBox("");
        setSearchSet(filteredSet)
    }

    return (
        <div className="setPage__main">
            <div className="main__header">
                <div className="switch__display">
                    <button className="btn btn__oneFlashcard" onClick={handleSwitchToOne}>
                        <i className="fas fa-square"></i>
                    </button>
                    <button className="btn btn__oneFlashcard" onClick={handleSwitchToTiles}>
                        <i className="fas fa-th"></i>
                    </button>
                    <div className={`closeFilterBox ${activeFilterBox}`}>
                        <p className="activeFilter">{activeSearch}</p>
                        <i className="fas fa-times closeActiveFilter" onClick={handleCloseSearchFilter}></i>
                    </div>
                </div>
                <p className="setName">{field}</p>
                <form className={`searchInSet ${search}`} onSubmit={(e) => handleSearchFlash(e, searchFlashInput)}>
                    <label htmlFor="searchFlashcard"/>
                    <input type="text" id="searchFlashcard" placeholder="find flashcard..."
                           value={searchFlashInput} onChange={(e) => setSearchFlashInput(e.target.value)}/>
                    <button type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>
            {searchSet.length === 0 ? <></> : <div className="flashcards">
                {tiles ? <Tiles filteredSet={searchSet === "none" ? filteredSet : searchSet}/> :
                    <FlashcardBig filteredSet={searchSet === "none" ? filteredSet : searchSet}
                                  handleDeleteFlashcard={handleDeleteFlashcard}
                                  handleEditFlashcard={handleEditFlashcard}
                                  setRemove={setRemove}
                                  remove={remove}
                                  loader={loader}
                                  setLoader={setLoader}
                    />}
            </div>}


        </div>
    )
}