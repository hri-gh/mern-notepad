const express = require('express');
const router = express.Router()
const { Note } = require("../models/Note");
const { fetchuser } = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Get all the Notes : GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    // console.log({ user: req.user.id });
    // console.log({ user: req.user });
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error ")
    }
});

// ROUTE  : Get specific Note : GET "/api/notes/fetchallnotes"
router.get("/fetchnote/:id", fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        // Allow deletion only if users owns the Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        res.json(note);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error ")
    }
})


// ROUTE 2 : Add a new Note using : POST "/api/notes/addnote"
router.post("/addnote", fetchuser, [
    body('title', 'title here').isLength({ min: 1 }),
    body('description', 'description here').isLength({ min: 1 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        // If there are error return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id,
        })
        const saveNote = await note.save()
        res.json(saveNote);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error ")
    }
});

// ROUTE 3 : Update an existing Note using : PUT "/api/notes/updatenote"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        console.log("Note.User:", note.user)

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error ")
    }
})

// ROUTE 4 : Delete an existing Note using : DELETE "/api/notes/deletenote"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        // Allow deletion only if users owns the Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error ")
    }
})

module.exports = router;