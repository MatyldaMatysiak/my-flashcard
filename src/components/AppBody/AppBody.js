import React, {useEffect, useState} from "react";
import './_appBody.scss'
import HomePage from "../HomePage/HomePage";
import NewFlashcard from "../NewFlashcard/NewFlashcard";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {db} from "../../firebaseConfig";
import {addDoc, collection, getDocs} from "firebase/firestore";

export default function AppBody() {
    const colRef = collection(db, 'flashcards');

    const [files, setFiles] = useState([]);

    console.log(files);

    useEffect(() => {
        getDocs(colRef)
            .then((snapshot) => {
            let flashcards = [];
            snapshot.docs.forEach((doc) => {
                flashcards.push({...doc.data(), id: doc.id})
            })
            setFiles([...flashcards])
            }).catch(err => console.log(err.message))
    }, [])

    const handleAddFlashcard = (flashcard) => {
        addDoc(colRef, flashcard).catch(() => {})
        setFiles([...files, flashcard])
    }

    return (
        <main className="mainApp">
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route path="/add">
                            <NewFlashcard handleAddFlashcard={handleAddFlashcard}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </main>
    )
}