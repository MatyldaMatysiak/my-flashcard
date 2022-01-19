import React from "react";

export default function NewFlashcard() {
    return (
        <form>
            <div className="flashcardBasicInfo">
                <div className="field">
                    <label htmlFor="field">Field</label>
                    <input type="text" id="field"/>
                </div>
                <div className="question">
                    <label htmlFor="question">Question</label>
                    <textarea name="question" id="question" cols="30" rows="10"/>
                </div>
                <div className="answer">
                    <label htmlFor="answer">Answer</label>
                    <textarea name="answer" id="answer" cols="30" rows="10"/>
                </div>
            </div>
            <div className="flashcardFilters">
                <label htmlFor="filter">Your filters</label>
                <div className="filters__adding">
                    <input type="text" id="filter"/>
                    <button className="addButton">
                        <i> </i>
                    </button>
                </div>

            </div>

        </form>
    )
}