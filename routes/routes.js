const router = require('express').Router();

const { getAndRenderNotes, activeNote } = require('.././db/db.json');

router.get('/notes', (req, res) => {
    let results = activeNote;
    if (getNotes) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('./notes/:id', (req, res) => {
    const result = findById(req.params.id, activeNote);
    if (result) {
        res.json(result);
    } else {
        res.send(404)
;    }
});

router.post('/notes', (req, res) => {
    req.body.id = activeNote.length.toString();

    if (!validateactiveNote(req.body)) {
        res.status(400).send('the note is not properly formatted');
    } else {
        const activeNote = getAndRenderNotes(req.body, activeNote);
        res.json(activeNote);
    }
});

module.exports = router; 