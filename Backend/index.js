import express from 'express';
import connectToMongo from './db.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import bcrypt from 'bcryptjs';
connectToMongo();
const app = express();
const port = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//avilable routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
  
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port}`);
});
