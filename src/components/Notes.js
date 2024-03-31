import React from 'react'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from "react-router-dom"


function Notes(props) {
    let navigate = useNavigate();
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context

useEffect(() => {
        if (localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.etag })

    }

    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert("Updated Successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            {/* MODAL */}
            <>
                {/* Button trigger modal */}
                <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{ display: "none" }}
                    ref={ref}
                >
                    Launch demo modal
                </button>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    style={{ opacity: "1", WebkitTransition: "top .13s", transition: "top .13s" }}

                >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">
                                            Title
                                        </label>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            style={{ float: "right", marginLeft: "80px" }}
                                        />
                                        <input
                                            type="text"
                                            // className="form-control"
                                            id="etitle"
                                            name='etitle'
                                            aria-describedby="emailHelp"
                                            onChange={onChange}
                                            value={note.etitle}
                                            style={{ width: "100%", borderRadius: "5px", border: "2px dashed black", }}
                                        />
                                    </div>
                                </h1>

                            </div>
                            <div className="modal-body">
                                <form>
                                    {/* <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="etitle"
                                            name='etitle'
                                            aria-describedby="emailHelp"
                                            onChange={onChange}
                                            value={note.etitle}
                                        />
                                    </div> */}
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">
                                            Description
                                        </label>
                                        <textarea
                                            rows="10"
                                            cols="30"
                                            type="text"
                                            className="form-control"
                                            id="edescription"
                                            name='edescription'
                                            onChange={onChange}
                                            value={note.edescription}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">
                                            Tag
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="etag"
                                            name='etag'
                                            onChange={onChange}
                                            value={note.etag}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    ref={refClose}
                                >
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleClick}>
                                    Update Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            {/* MODAL */}

            <div className="row my-3">
                <h1>Your Notes</h1>
                <h4 style={{ textAlign: "center" }}>{notes.length === 0 && "No notes to display !"}</h4>
                {notes.map((note) => {
                    // console.log(notes);
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
