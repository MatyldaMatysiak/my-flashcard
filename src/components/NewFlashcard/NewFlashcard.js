import React from "react";
import './_newFlashcard.scss'
import {Link} from "react-router-dom";

export default function NewFlashcard() {
    return (
        <form onSubmit={(e) => e.preventDefault() }>
            <section className="flashcardInfo">
                <div className="flashcardInfo__basic">
                    <div className="field">
                        <label htmlFor="field">Field</label>
                        <input type="text" id="field"/>
                    </div>
                    <div className="question">
                        <label htmlFor="question">Question</label>
                        <textarea name="question" id="question" rows="5"/>
                    </div>
                    <div className="answer">
                        <label htmlFor="answer">Answer</label>
                        <textarea name="answer" id="answer" rows="5"/>
                    </div>
                </div>
                <div className="flashcardInfo__filters">
                    <label htmlFor="filter">Your filters</label>
                    <div className="filters__adding">
                        <input type="text" id="filter"/>
                        <button className="addButton">
                            <i> </i>
                        </button>
                    </div>
                </div>
            </section>
            <div className="buttonBox">
                <Link className="btn btn__submit" to="/">Add</Link>
                <Link className="btn btn__cancel" to="/">Cancel</Link>
            </div>
        </form>
    )
}