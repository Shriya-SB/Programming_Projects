import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/noteContext'
// This is my first step towards git to make my work easy and fast.
const AddNote = () => {
    let context = useContext(NoteContext)
    // Create a state to define the element of form
    const [note, setNote] = useState({title: '', desc: '', tag: ''})
    let {addNote} = context // Use destructring to remove the API call
    // Make a function of submit
    const handleClick = (e)=>{
        e.preventDefault()
        // tell what the function takes
        addNote(note.title, note.desc, note.tag)
        // After submitting make the fields blank
        setNote({title: '', desc: '', tag: ''})
    }
    // Allow user to access input fields
    const handleChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
        {/* Add html */}
        {/* Make sure you add necessary detail like name, onChange, onSubmit method etc.. */}
            <div className="container">
                <form method="POST" onSubmit={handleClick}>
                    <h1 className="my-3 text-center">Add Note</h1>
                    <div className="mb-3 container">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input required name="title" value={note.title} onChange={handleChange} type="text" className="form-control" id="title" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3 container">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input required name="desc" value={note.desc} onChange={handleChange} type="text" className="form-control" id="desc" />
                    </div>
                    <div className="mb-3 container">
                        <label htmlFor="exampleInputPassword1" className="form-label">tag</label>
                        <input required name="tag" value={note.tag} onChange={handleChange} type="text" className="form-control" id="tag" />
                    <button type="submit" className="btn btn-primary my-3">Add Note</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddNote