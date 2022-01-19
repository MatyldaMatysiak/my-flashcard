import React from "react";
import './_appBody.scss'
import HomePage from "../HomePage/HomePage";
import NewFlashcard from "../NewFlashcard/NewFlashcard";



export default function AppBody() {
    return (
        <main className="mainApp">
            <div className="container">
                <HomePage />
                <NewFlashcard />
            </div>
        </main>
    )
}