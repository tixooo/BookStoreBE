import express from 'express';
import connectDB from "./db.js"
import cors from 'cors';
// import corsOptions from '../routes/cors.js';
import auth from '../routes/auth.js';
import dotenv from 'dotenv';
import books from '../routes/books.js';
import authenticateToken from '../middleware/authToken.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5353;
app.use('/public', express.static('public'));
app.use(express.json())
app.use(cors())
app.use(authenticateToken)

connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server is running on port ${port}`);
    })
    app.use('/auth', auth)
    app.use('/', books)
    // app.use('/profile', profile)
})