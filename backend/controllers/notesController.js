const Note = require('../models/Note');

exports.getAllNotes = async function (req, res) {
  try {
    // console.log(express.json());
    const notes = await Note.find().sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error('Error - ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getNote = async function (req, res) {
  try {
    const notes = await Note.findById(req.params.id);

    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching one Note - ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createNote = async function (req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    console.error('Error - ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateNote = async function (req, res) {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json(note);
  } catch (error) {
    console.error('Error - ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteNote = async function (req, res) {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Note Deleted successfully.' });
  } catch (error) {
    console.error('Error - ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
