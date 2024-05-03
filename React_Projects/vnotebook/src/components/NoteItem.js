import React, { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <>
            <div className="col-md-3 my-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.desc}</p>
                    </div>
                    <button className="btn btn-sm btn-primary" onClick={() => { updateNote(note) }}>Edit Note</button>
                    <button className="btn btn-sm btn-danger" onClick={() => { deleteNote(note._id) }}>Delete Note</button>
                </div>
            </div>
        </>
    )
}

export default NoteItem;