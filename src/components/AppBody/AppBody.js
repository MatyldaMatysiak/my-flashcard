import React from "react";
import './_appBody.scss'
import HomePage from "../HomePage/HomePage";



export default function AppBody() {
    return (
        <main className="mainApp">
            <div className="container">
                <HomePage />
            </div>
        </main>
    )
}