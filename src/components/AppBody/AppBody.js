import React, {useEffect, useState} from "react";
import './_appBody.scss'
import HomePage from "../HomePage/HomePage";
import NewFlashcard from "../NewFlashcard/NewFlashcard";
import {Route, Switch} from "react-router-dom";
import {db} from "../../firebaseConfig";
import {addDoc, collection, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";
import YourFields from "../yourFields/YourFields";
import Set from "../Set/Set";
import FlashcardBig from "../flashcardBig/FlashcardBig";

export default function AppBody() {
    const colRef = collection(db, 'flashcards');



    const [add, setAdd] = useState(false)
    const [remove, setRemove] = useState(false)
    const [files, setFiles] = useState([]);
    const [setBig, setSetBig] = useState([])


    useEffect(() => {

        getDocs(colRef)
            .then((snapshot) => {
                let flashcards = [];
                snapshot.docs.forEach((doc) => {
                    flashcards.push({...doc.data(), id: doc.id})
                })
                setFiles([...flashcards])
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
                        />
                    </Route>
                    <Route exact path="/sets/:field">
                        <Set files={files}
                             add={add}
                             setSetBig={setSetBig}
                             handleDeleteFlashcard={handleDeleteFlashcard}
                             handleEditFlashcard={handleEditFlashcard}
                             remove={remove}
                             setRemove={setRemove}
                             handleAddFlashcard={handleAddFlashcard}
                             setAdd={setAdd}
                        />
                    </Route>
                    <Route exact path="/all">
                        {/*<FlashcardBig setBig={files}/>*/}
                    </Route>
                </Switch>
            </div>
        </main>
    )
}