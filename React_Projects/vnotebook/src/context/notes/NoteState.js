import NoteContext from "./noteContext";
import { useState } from "react";
// In this we will create the functions which will connect to backend API.
const NoteState = (props) => {
  const { showAlert } = props
  const [notes, setNotes] = useState([]);
  let token = localStorage.getItem('token')
  // Get all Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      const responseData = await response.json();
      const fetchedNotes = responseData.notes; // Extract the "notes" property
      setNotes(fetchedNotes);

    } catch (error) {
      console.error('Error fetching notes:', error); // throw error.
    }
  }

  // Add a Note
  const addNote = async (title, desc, tag) => {
    try {
      const response = await fetch(`addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({ title, desc, tag })
      });

      const responseData = await response.json();

      if (response.success || response.status === 201) {
        showAlert("Note added successfully!!", "success") // show alert
        console.log("Note added successfully:", responseData);
        setNotes((prevNotes) => [...prevNotes, responseData.note]); // Corrected responseData.note
        // Only modify notes array on success
      } else {
        console.log("Failed to add note:", responseData);
      }
    } catch (error) {
      console.log(error)
    }
  }



  // Delete a Note
  const deleteNote = async (id) => {
    try {
      // Connect to API
      const response = await fetch(`deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      const json = await response.json();
      console.log(json)
      // Use filter to edit array
      const newNotes = notes.filter((note) => {
        return note._id !== id
      })
      showAlert("Note deleted successfully!", 'success') // show alert
      setNotes(newNotes)
    } catch (error) {
      console.log(error)

    }
  }

  // Edit a Note
  const editNote = async (id, title, desc, tag) => {
    // Connect to API
    try {
      const response = await fetch(`updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
        body: JSON.stringify({ title, desc, tag })
      });
      const json = await response.json();
      console.log(json)
      let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].desc = desc;
          newNotes[index].tag = tag;
          break;
        }
      }
      showAlert("Note updated successfully!!", 'success') // show alert
      setNotes(newNotes);
      console.log(newNotes)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>

  )

}
export default NoteState;