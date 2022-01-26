import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import './_set.scss';
import {Link} from "react-router-dom";
import FlashcardBig from "../flashcardBig/FlashcardBig";
import Tiles from "../tiles/Tiles";
import Modal from "../madal/Modal";
import NewFlashcard from "../NewFlashcard/NewFlashcard";

export default function Set({files, add, setAdd, handleAddFlashcard, handleEditFlashcard, handleDeleteFlashcard, remove, setRemove}) {
    const {field} = useParams()
    const [set, setSet] = useState([])
    const [filtersList, setFilterList] = useState([])
    const [filteredSet, setFilteredSet] = useState([])
    const [searchFlashInput, setSearchFlashInput] = useState("")
    const [tiles, setTiles] = useState(true)
    const [activeFilter, setActiveFilter] = useState("all")
    const [loader, setLoader] = useState("loading")
    // const [hideMenu, setHideMenu] = useState("visible")
    const [modalRender, setModalRender] = useState("close")

    console.log(filtersList)
    // console.log(filteredSet)

    useEffect(() => {
        const newSet = files.filter(function (file) {
            return file.field === field;
        });
        console.log(newSet)
        let newFiltersList = [];
        newSet.forEach(list => {

            list.filters.forEach(filter => {
                if (!newFiltersList.includes(filter)) {
                    newFiltersList.push(filter)
                }
            })

        })

        setFilterList(["all", ...newFiltersList.sort()])
        setSet([...newSet]);
        setFilteredSet([...newSet])
    }, [files, add, remove])

    const handleChooseFilter = (filter) => {
        if (filter === "all") {
            setFilteredSet([...set])
        } else {
            const newFilteredSet = set.filter(function (element) {
                return element.filters.includes(filter);
            });
            setFilteredSet([...newFilteredSet])

        }
        setActiveFilter(filter)
        setLoader("loading")
    }

    const handleSearchFlash = (e, searchFlashInput) => {
        e.preventDefault();
        const newFilteredSet = [];

        filteredSet.forEach(flash => {
            if (flash.question.includes(searchFlashInput) || flash.answer.includes(searchFlashInput)) {
                newFilteredSet.push(flash)
            }
        })

        setFilteredSet([...newFilteredSet]);
        setSearchFlashInput("")
    }

    const handleSwitchToOne = () => {
        setTiles(false)
    }

    const handleSwitchToTiles = () => {
        setTiles(true)
    }

    const handleAdd = () => {
        setModalRender("open")
    }

    return (
        <>
            <div className="setPage">
                <div className="filtersBox">
                    <button className="btn__add" onClick={handleAdd}>
                        <i className="fas fa-plus"></i>
                        <p>Add flashcard</p>
                    </button>
                    {modalRender === "open" ? <Modal><NewFlashcard setModalDisplay={setModalRender} handleAddFlashcard={handleAddFlashcard} setAdd={setAdd} isField={field}/></Modal> : <></>}
                    <Link to="/sets">
                        <button className="btn__back">
                            <i className="fas fa-arrow-left"></i>
                            <p>Back to sets</p>
                        </button>
                    </Link>
                    <h3 className="filterList__title">filters</h3>
                    <ul>
                        {filtersList.map(filter => <li className={`filterElement ${filter === activeFilter ? "active" : ""}`} key={filter}
                                                       onClick={() => handleChooseFilter(filter)}>{filter}</li>)}
                    </ul>
                    {/*<div className="hideMenu">*/}
                    {/*    <i className="fas fa-angle-double-left arrow-hide"></i>*/}
                    {/*</div>*/}
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
                        <p className="setName">{field}</p>
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
                            <FlashcardBig filteredSet={filteredSet}
                                          activeFilter={activeFilter}
                                          handleDeleteFlashcard={handleDeleteFlashcard}
                                          handleEditFlashcard={handleEditFlashcard}
                                          setRemove={setRemove}
                                          remove={remove}
                                          loader={loader}
                                          setLoader={setLoader}
                            />}
                    </div>

                </div>
            </div>
        </>

    )
}