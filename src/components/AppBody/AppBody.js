import React, {useEffect, useState} from "react";
import './_appBody.scss'
import HomePage from "../HomePage/HomePage";
import NewFlashcard from "../NewFlashcard/NewFlashcard";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {db} from "../../firebaseConfig";
import {addDoc, collection, getDocs} from "firebase/firestore";
import YourFields from "../yourFields/YourFields";
import Set from "../Set/Set";
import FlashcardBig from "../flashcardBig/FlashcardBig";

export default function AppBody() {
    const colRef = collection(db, 'flashcards');

    const [add, setAdd] = useState(false)
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

    }, [add])

    const handleAddFlashcard = (flashcard) => {
        addDoc(colRef, flashcard).catch(() => {})
    }

    return (
        <main className="mainApp">
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route exact path="/add">
                            <NewFlashcard handleAddFlashcard={handleAddFlashcard} setAdd={setAdd} add={add}/>
                        </Route>
                        <Route exact path="/sets">
                            <YourFields files={files} />
                        </Route>
                        <Route exact path="/sets/:field">
                            <Set files={files} add={add} setSetBig={setSetBig}/>
                        </Route>
                        <Route exact path="/all">
                            <FlashcardBig setBig={files}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </main>
    )
}