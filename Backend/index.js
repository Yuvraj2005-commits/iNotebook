import express from 'express';
import connectToMongo from './db.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();  // Load .env variables
connectToMongo(); // Connect to MongoDB

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Available routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});
