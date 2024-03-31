import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function Noteitem(props) {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote } = props
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title" onClick={() => { updateNote(note) }}>{note.title}</h5>
                    <p className="card-text" onClick={() => { updateNote(note) }}>{note.description}</p>
                    <i id='delete-btn' className="fa-solid fa-trash mx-2"
                        onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Deleted Successfully", "success")
                        }} />
                    <i id='edit-btn' className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note); }} />
                </div>
                <div className="card-footer">
                    <small className="text-body-secondary">Last updated 3 mins ago</small>
                </div>
            </div>
        </div>

    )
}

export default Noteitem
