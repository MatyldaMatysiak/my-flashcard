import React, {useState} from "react";
import './_newFlashcard.scss'
import {Link} from "react-router-dom";

export default function NewFlashcard({handleAddFlashcard, setAdd, add}) {
    const [field, setField] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [filters, setFilters] = useState([]);
    const [filter, setFilter] = useState("");

    const handleAddFilters = (filter) => {
        setFilters([...filters, filter])
        setFilter("")
    }

    const addNewFlashcard = () => {
        const newFlashcard = {
            field,
            question,
            answer,
            filters,
            status: "learning"
        }
        handleAddFlashcard(newFlashcard);
        setAdd(!add)
    }

    return (
        <form onSubmit={(e) => e.preventDefault() } className="newFlashAddForm">
            <section className="flashcardInfo">
                <div className="flashcardInfo__basic">
                    <div className="field">
                        <label htmlFor="field">Field</label>
                        <input type="text"
                               id="field"
                               value={field}
                               onChange={e => setField(e.target.value)}
                        />
                    </div>
                    <div className="question">
                        <label htmlFor="question">Question</label>
                        <textarea name="question"
                                  id="question"
                                  rows="5"
                                  value={question}
                                  onChange={e => setQuestion(e.target.value)}
                        />
                    </div>
                    <div className="answer">
                        <label htmlFor="answer">Answer</label>
                        <textarea name="answer"
                                  id="answer"
                                  rows="5"
                                  value={answer}
                                  onChange={e => setAnswer(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flashcardInfo__filters">
                    <label htmlFor="filter">Your filters</label>
                    <div className="filters__adding">
                        <input type="text"
                               id="filter"
                               value={filter}
                               onChange={e => setFilter(e.target.value)}
                        />
                        <button className="addButton" onClick={() => handleAddFilters(filter)}>
                            <i> </i>
                        </button>
                    </div>
                    <ul>
                        {filters.map(filter => <li key={filter}>{filter}</li>)}
                    </ul>
                </div>
            </section>
            <div className="buttonBox">
                <Link className="btn btn__submit" to="/" onClick={addNewFlashcard}>Add</Link>
                <Link className="btn btn__cancel" to="/">Cancel</Link>
            </div>
        </form>
    )
}