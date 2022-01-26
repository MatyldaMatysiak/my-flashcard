import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import './_set.scss';
import {Link} from "react-router-dom";
import FlashcardBig from "../flashcardBig/FlashcardBig";
import Tiles from "../tiles/Tiles";
import Modal from "../madal/Modal";
import NewFlashcard from "../NewFlashcard/NewFlashcard";
import FlashcardView from "../flashcardView/FlashcardView";

export default function Set({files, add, setAdd, handleAddFlashcard, handleEditFlashcard, handleDeleteFlashcard, remove, setRemove}) {
    const {field} = useParams()
    const [set, setSet] = useState([])
    const [filtersList, setFilterList] = useState([])
    const [filteredSet, setFilteredSet] = useState([])
    const [activeFilter, setActiveFilter] = useState("all")
    const [loader, setLoader] = useState("loading")
    // const [hideMenu, setHideMenu] = useState("visible")
    const [modalRender, setModalRender] = useState("close")

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
                <FlashcardView field={field}
                               filteredSet={filteredSet}
                               setFilteredSet={setFilteredSet}
                               handleEditFlashcard={handleEditFlashcard}
                               handleDeleteFlashcard={handleDeleteFlashcard}
                               remove={remove}
                               setRemove={setRemove}
                               loader={loader}
                               setLoader={setLoader}
                />
            </div>
        </>
    )
}