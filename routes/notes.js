const notes = require('express').Router();
const { readFromFile, readAndAppend, readDeleteEntryByIdAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.json('Error in adding note');
  }
});

notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received to delete a note`);
  console.log(req.params);
  
  if (req.params.id) {
    readDeleteEntryByIdAndAppend(req.params.id, './db/db.json')
    res.json(`Note deleted successfully 🗑️`);
    } else {
    res.json('Error in deleting note');
  }
});

module.exports = notes;
