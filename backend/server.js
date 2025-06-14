const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const notesRoutes = require('./routes/notesRoutes');

dotenv.config();

const app = express();
// const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}
app.use(express.json());
app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('DB CONNECTED SUCCESSSFULLY!');
  } catch (error) {
    console.error('Error connecting to DB', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(5001, () => {
    console.log('Listening on port 5001');
  });
});
