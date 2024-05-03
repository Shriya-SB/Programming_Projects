import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const { notes, getNotes, editNote } = useContext(NoteContext);
    const [note, setNote] = useState({ id: '', etitle: '', edesc: '', etag: '' });
    const navigate = useNavigate();
    useEffect(() => {
        let tokens = JSON.parse(localStorage.getItem('vnotebook'));
        if (!tokens) {
            navigate('/login');
        }
        else {
            getNotes();
        }
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edesc: currentNote.desc, etag: currentNote.tag });
    }
    const ref = useRef(null);
    const refClose = useRef(null);
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edesc, note.etag);
        refClose.current.click();
    }
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            {/* Call addnote to display form. */}
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-etitle" id="exampleModalLabel">Editing a Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <h1 className="my-3">Update Note</h1>
                                <div className="mb-3 container">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input name="etitle" value={note.etitle} onChange={handleChange} type="text" className="form-control" id="etitle" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3 container">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <input name="edesc" value={note.edesc} onChange={handleChange} type="text" className="form-control" id="edesc" />
                                </div>
                                <div className="mb-3 container">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                    <input name="etag" value={note.etag} onChange={handleChange} type="text" className="form-control" id="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className='text-center' style={{ fontSize: '40px' }}>Your Notes</h2>
            <div className="row my-2 mx-auto" style={{ marginLeft: '85px' }}>
                <div className="align-items-center justify-content-center container text-center mx-auto">
                    {notes.length === 0 ? <h6>No Notes to display</h6> :
                        Array.isArray(notes) && notes.map((note) => {
                            return <NoteItem note={note} key={note._id} updateNote={updateNote} />
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default Notes;