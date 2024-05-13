// index.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import morgan from 'morgan';
import { connectDB } from './src/db.js'; 
import authRoutes from './src/routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import taskRoutes from './src/routes/tasks.routes.js';

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use( authRoutes);
app.use( taskRoutes);
const blogsData = JSON.parse(fs.readFileSync('./api/blogsData.json', 'utf-8'));

app.get('/', (req, res) => {
    res.send("Blog server is running!");
});

app.get('/blogs', (req, res) => {
  res.send(blogsData);
});

app.get('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blog = blogsData.filter(b => b.id === id);
  res.send(blog);
});
connectDB(); // Llamada a la función connectDB
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
