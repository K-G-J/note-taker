const notesArr = require('../../db/db');
const fs = require('fs');
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();


router
.route('/notes')
.get((req, res) => {
    res.json(notesArr);
})
.post((req, res) => {
    const newNote = createNewNote(req.body, notesArr)
    res.json(newNote)
});

function createNewNote(body, notesArr) {
    const newNote = body;
    if (!Array.isArray(notesArr)) {
        notesArr = [];
    }
    newNote.id = uuidv4();
    notesArr.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'),JSON.stringify(notesArr, null, 2));
    return newNote;
}
router
.delete('/notes/:id', (req, res) => {
    const id = req.params;
    const noteIndex = notesArr.findIndex(note => note.id === id);
    notesArr.splice(noteIndex, 1);
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'),JSON.stringify(notesArr, null, 2));
    res.json(notesArr)
});

module.exports = router;