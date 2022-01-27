import React, {useEffect, useState} from "react";
import '../../components/NewFlashcard/_newFlashcard.scss'

export default function UpdateFlashcard({flash, setModalDisplay, handleEditFlashcard}) {
    const [field, setField] = useState(`${flash.field}`);
    const [question, setQuestion] = useState(`${flash.question}`);
    const [answer, setAnswer] = useState(`${flash.answer}`);
    const [filters, setFilters] = useState([...flash.filters]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setField(`${flash.field}`);
        setQuestion(`${flash.question}`);
        setAnswer(`${flash.answer}`);
        setFilters([...flash.filters])
    }, [flash])

    const handleAddFilters = (filter) => {
        setFilters([...filters, filter])
        setFilter("")
    }

    const updateFlashcard = (e) => {
        e.preventDefault();
        const newFlashcard = {
            field,
            question,
            answer,
            filters,
            status: "learning"
        }
        handleEditFlashcard(flash.id, newFlashcard);
        setModalDisplay("")
    }


    const handleCancelUpdate = () => {
        setModalDisplay("")
    }

    return (
        <form onSubmit={(e) => updateFlashcard(e) } className="newFlashAddForm">
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
                <button type="submit" className="btn btn__submit" >Update</button>
                <button type="button" className="btn btn__cancel" onClick={handleCancelUpdate}>Cancel</button>
            </div>
        </form>
    )
}