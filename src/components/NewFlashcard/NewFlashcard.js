import React, {useState} from "react";
import './_newFlashcard.scss'

export default function NewFlashcard({handleAddFlashcard, setModalDisplay, isField, setAdd, add}) {
    const [field, setField] = useState(isField === "undefined" ? "" : isField);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [filters, setFilters] = useState([]);
    const [filter, setFilter] = useState("");

    const handleAddFilters = (filter) => {
        setFilters([...filters, filter])
        setFilter("")
    }

    const addNewFlashcard = (e) => {
        e.preventDefault();
        const newFlashcard = {
            field,
            question,
            answer,
            filters,
            status: "learning"
        }
        handleAddFlashcard(newFlashcard);
        setAdd(!add)
        setModalDisplay("close")
    }

    const handleCancelAdd = () => {
        setModalDisplay("close")
    }

    return (
        <form onSubmit={(e) => addNewFlashcard(e) } className="newFlashAddForm">
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
                        <button type="button" className="addButton" onClick={() => handleAddFilters(filter)}>
                            <i> </i>
                        </button>
                    </div>
                    <ul>
                        {filters.map(filter => <li key={filter}>{filter}</li>)}
                    </ul>
                </div>
            </section>
            <div className="buttonBox">
                <button type="submit" className="btn btn__submit">Add</button>
                <button type="button" className="btn btn__cancel" onClick={handleCancelAdd}>Cancel</button>
            </div>
        </form>
    )
}