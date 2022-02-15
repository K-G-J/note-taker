const notesArr = require('../../db/db');
const fs = require('fs');
const path = require('path')
import { v4 as uuidv4 } from 'uuid';
const router = require('express').Router();


router
.route('/notes')
.get((req, res) => {
    res.json(notesArr.slice(1));
})
.post((req, res) => {
    const newNote = createNewNote(req.body, notesArr)
    res.json(newNote)
});

function createNewNote(body, notesArr) {
    const newNote = body;
    if (!Array.isArray(notesArr))
    notesArr = [];
    if (notesArr.length === 0)
    notesArr.push(0);
    newNote.id = uuidv4();
    notesArr.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),JSON.stringify(notesArr, null, 2));
    return newNote;
}
router
.delete('/notes/:id', (req, res) => {
    const id = req.params;
    const noteIndex = notesArr.findIndex(note => note.id === id);
    notesArr.splice(noteIndex, 1);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),JSON.stringify(notesArr, null, 2));
    res.json(notesArr)
});

module.exports = router;