const express = require('express');
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')
// Make sure that in this file, in every route the auth-token is necessary,
// So no one can access these routes without authtoken so import fetchuser and apply it in all routes
// Create an endpoint to fetch all notes from the user and location is "http://localhost:6000/api/notes/fetchAllNotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    // Create an variable and say that from the notes find all note from user if and display it.
    try {
        const notes = await Notes.find({ user: req.user.id })
        return res.status(201).json({ success: true, notes })
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }
})
// Create an route to add the notes. And the location is "http://localhost:6000/addnote"
router.post("/addnote", [
    body("title", 'Enter a valid title!!').isLength({ min: 2 }),
    body("desc", 'Description must be 3 characters!!').isLength({ min: 3 }),
], fetchuser, async (req, res) => {
    const errors = validationResult(req);
    // Make sure that user cannot add an empty note
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }
    const { title, desc, tag } = req.body; // remove title, desc and tag from the body to use it manually
    try {
        // If a user tries to add a note, create a new note and save it in the database
        const note = new Notes({
            title: title,
            desc: desc,
            tag: tag,
            user: req.user.id
        });
        const response = await note.save();
        // Display the result
        return res.status(201).json({ success: true, note: response }); // Changed "response" key to "note"
    } catch (error) {
        // Give an error point
        return res.status(500).json({ success: false, error });
    }
});

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.status(201).json({ success: true, note });
    } catch (error) {
        res.status(500).send("Internal Server Error", error);
    }
})

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    // Make sure the user id matches if not show error
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found!!")
        }
        // Allow deletion if the id matches else throw error
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: "Not Allowed!!" })
        }
        // Find By Id and delete is the method in which we can delete something which has it's own id
        note = await Notes.findByIdAndDelete(req.params.id)
        return res.json({ success: true, note, message: 'Note has been deleted successfully!!' })
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }
})

module.exports = router