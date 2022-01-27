import React, {useEffect, useState} from "react";
import './_appBody.scss'
import HomePage from "../HomePage/HomePage";
import NewFlashcard from "../NewFlashcard/NewFlashcard";
import {Route, Switch} from "react-router-dom";
import {db} from "../../firebaseConfig";
import {addDoc, collection, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";
import YourFields from "../yourFields/YourFields";
import Set from "../Set/Set";
import FlashcardView from "../flashcardView/FlashcardView";

export default function AppBody() {
    const colRef = collection(db, 'flashcards');

    const [add, setAdd] = useState(false)
    const [remove, setRemove] = useState(false)
    const [files, setFiles] = useState([]);
    const [searchFiles, setSearchFiles] = useState(files)


    useEffect(() => {

        getDocs(colRef)
            .then((snapshot) => {
                let flashcards = [];
                snapshot.docs.forEach((doc) => {
                    flashcards.push({...doc.data(), id: doc.id})
                })
                setFiles([...flashcards])
                setSearchFiles([...flashcards])
            }).catch(err => console.log(err.message))

    }, [add, remove])

    const handleAddFlashcard = (flashcard) => {
        addDoc(colRef, flashcard).catch(() => {})
    }

    const handleDeleteFlashcard = (flashcardId) => {
        const docRef = doc(db, "flashcards", flashcardId);
        deleteDoc(docRef).catch(() => {});
    }

    const handleEditFlashcard = (flashcardId, flashcard) => {
        const docRef = doc(db, "flashcards", flashcardId);
        updateDoc(docRef, flashcard).catch(() => {});
        setAdd(!add)
    }

    return (
        <main className="mainApp">
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <HomePage files={files}
                                  handleAddFlashcard={handleAddFlashcard}
                                  setAdd={setAdd}
                        />
                    </Route>
                    <Route exact path="/add">
                        <NewFlashcard handleAddFlashcard={handleAddFlashcard}
                                      setAdd={setAdd}
                                      add={add}
                        />
                    </Route>
                    <Route exact path="/sets">
                        <YourFields files={files}
                                    handleAddFlashcard={handleAddFlashcard}
                                    setAdd={setAdd}
                                    setSearchFiles={setSearchFiles}
                        />
                    </Route>
                    <Route exact path="/sets/:field">
                        <Set files={files}
                             add={add}
                             handleDeleteFlashcard={handleDeleteFlashcard}
                             handleEditFlashcard={handleEditFlashcard}
                             remove={remove}
                             setRemove={setRemove}
                             handleAddFlashcard={handleAddFlashcard}
                             setAdd={setAdd}
                        />
                    </Route>
                    <Route exact path="/all">
                        <FlashcardView filteredSet={searchFiles}
                                       setFilteredSet={setSearchFiles}
                                       handleDeleteFlashcard={handleDeleteFlashcard}
                                       handleEditFlashcard={handleEditFlashcard}
                                       remove={remove}
                                       setRemove={setRemove}
                        />
                    </Route>
                </Switch>
            </div>
        </main>
    )
}