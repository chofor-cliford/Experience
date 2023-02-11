import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/post.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extented: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extented: true }));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/users', authRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })   
     .then(() => app.listen(PORT, () => console.log(`Server runing on port: ${PORT}`)))
     .catch((error) => console.log(error.message))
    
        



